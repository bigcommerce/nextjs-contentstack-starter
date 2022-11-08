import { NextApiRequest, NextApiResponse } from "next";
import { parseString } from "set-cookie-parser";

const BigCommerce = require("node-bigcommerce");
import getCartCookie from "./utils/get-cart-cookie";
import { normalizeCart } from "@lib/bigcommerce/normalize";
import { Cart } from "@lib/bigcommerce/types/cart";

export default async function cart(req: NextApiRequest, res: NextApiResponse) {
  const { body, method, headers } = req;
  const ONE_DAY = 60 * 60 * 24;
  const API_TOKEN = process.env.BIGCOMMERCE_STORE_API_TOKEN;
  const CLIENT_ID = process.env.BIGCOMMERCE_STORE_API_CLIENT_ID;

  const STORE_HASH = process.env.BIGCOMMERCE_STORE_API_STORE_HASH;
  var bigCommerce = new BigCommerce({
    clientId: CLIENT_ID,
    accessToken: API_TOKEN,
    storeHash: STORE_HASH,
    apiVersion: "v3",
    responseType: "json",
  });

  if (method === "GET") {
    try {
      if (headers?.cookie) {
        // @ts-ignore
        const { bc_cart } = parseString(headers?.cookie);

        if (bc_cart) {
          const { data } = await bigCommerce.get(
            `/carts/${bc_cart}?include=line_items.physical_items.options`
          );
          res.status(200).json(normalizeCart(data) || null);
        }
      }
    } catch (error) {
      // @ts-ignore
      const { message, response } = error;
      res
        .status(response?.status || 500)
        .end(message || "Authentication failed, please re-install");
    }
  } else if (method === "POST") {
    try {
      var data: Cart;
      // @ts-ignore
      let { bc_cart } = parseString(headers?.cookie);
      if (bc_cart) {
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
          data = await bigCommerce.post(
            `/carts/${bc_cart}/items?include=line_items.physical_items.options`,
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
        data = await bigCommerce.post(
          "/carts?include=line_items.physical_items.options",
          cart
        );
      }

      // @ts-ignore
      const cartId = data?.data?.id;
      // Create or update the cart cookie
      res.setHeader(
        "Set-Cookie",
        getCartCookie("bc_cart", cartId, ONE_DAY * 30)
      );
      // @ts-ignore
      res.status(200).json(normalizeCart(data));
    } catch (error) {
      // @ts-ignore
      const { message, response } = error;
      res
        .status(response?.status || 500)
        .end(message || "Authentication failed, please re-install");
    }
  }
}
