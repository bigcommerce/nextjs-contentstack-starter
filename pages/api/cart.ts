import { NextApiRequest, NextApiResponse } from "next";
import { parseString } from "set-cookie-parser";

const BigCommerce = require("node-bigcommerce");
import getCartCookie from "./utils/get-cart-cookie";

export default async function cart(req: NextApiRequest, res: NextApiResponse) {
  const {
    body,
    query: { pid },
    method,
    headers,
  } = req;
  const ONE_DAY = 60 * 60 * 24;
  const API_URL = process.env.BIGCOMMERCE_STORE_API_URL;
  const API_TOKEN = process.env.BIGCOMMERCE_STORE_API_TOKEN;
  const CLIENT_ID = process.env.BIGCOMMERCE_STORE_API_CLIENT_ID;

  const STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH;
  var bigCommerce = new BigCommerce({
    clientId: CLIENT_ID,
    accessToken: API_TOKEN,
    storeHash: STORE_HASH,
    apiVersion: "v3",
    responseType: "json",
  });

  // @ts-ignore
  let { bc_cart } = parseString(headers?.cookie);

  if (method === "GET") {
    try {
      const { data } = await bigCommerce.get(`/carts/${bc_cart}`);

      console.log("currentCart", data);
      res.status(200).json(data);
    } catch (error) {
      // @ts-ignore
      const { message, response } = error;
      res
        .status(response?.status || 500)
        .end(message || "Authentication failed, please re-install");
    }
  } else if (method === "POST") {
    try {
      console.log("method", method);
      console.log("body", body?.variants?.edges[0]?.node?.entityId);

      console.log("parsed", bc_cart);

      var returnedCart = {};
      if (bc_cart) {
        console.log("add item");

        var cart = {
          line_items: [
            {
              quantity: 1,
              product_id: body?.entityId,
              list_price: body?.prices?.price?.value,
              variant_id: body?.variants?.edges[0]?.node?.entityId,
            },
          ],
        };
        try {
          returnedCart = await bigCommerce.post(
            `/carts/${bc_cart}/items`,
            cart
          );
        } catch (error) {
          // @ts-ignore
          const { message, response } = error;
          res
            .status(response?.status || 500)
            .end(message || "Authentication failed, please re-install");
        }
      } else {
        var cart = {
          line_items: [
            {
              quantity: 1,
              product_id: body?.entityId,
              list_price: body?.prices?.price?.value,
              variant_id: body?.variants?.edges[0]?.node?.entityId,
            },
          ],
        };
        returnedCart = await bigCommerce.post("/carts", cart);
      }

      // Create or update the cart cookie
      res.setHeader(
        "Set-Cookie",
        // @ts-ignore
        getCartCookie("bc_cart", returnedCart?.data?.id, ONE_DAY * 30)
      );
      // res.status(200).json({ data: normalizeCart(data) })
      res.status(200).json(returnedCart);
    } catch (error) {
      // @ts-ignore
      const { message, response } = error;
      res
        .status(response?.status || 500)
        .end(message || "Authentication failed, please re-install");
    }
  }
}
