import type { GetStaticPropsContext } from "next";
import { Bag } from "@components/icons";
import { Layout } from "@vercel/examples-ui";
import { Navbar, Footer, UIComponent, Container } from "@components/ui";
import React, { useEffect, useState } from "react";
import { getAllEntries } from "@lib/cms/cmsEntries";
import { GetStaticPropsResult } from "next";
import { CartItem } from "@components/ui/cart";

export async function getStaticProps({
  params,
}: GetStaticPropsContext): Promise<
  GetStaticPropsResult<any | null> | undefined
> {
  const entry = await getAllEntries("header");
  console.log("entry", entry);

  const navBar: any = entry[0] || null;

  return {
    props: { navBar },
  };
}

export default function Cart(props: any) {
  //TODO switch over to new header entitiy
  const { navbar, modular_blocks = [] } = props;

  const checkout = async () => {
    try {
      await fetch(`/api/checkout`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          window.location = data?.redirect_urls?.checkout_url;
        });
    } catch (error) {
      console.error("Error going to checkout: ", error);
    }
  };

  const [cart, setCart] = useState(null);
  useEffect(() => {
    async function getCart() {
      await fetch(`/api/cart`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data: any) {
          setCart(data);
        });
    }
    getCart();
  }, []);

  console.log("cart", cart);
  return (
    <>
      <Container>
        <Navbar data={navbar} />
        <div className="grid lg:grid-cols-12 w-full max-w-7xl mx-auto">
          <div className="lg:col-span-8">
            {/*// @ts-ignore*/}
            {cart?.lineItems > 0 ? (
              <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
                <span className="border border-dashed border-secondary flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
                  <Bag className="absolute" />
                </span>
                <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
                  Your cart is empty
                </h2>
              </div>
            ) : (
              <div className="px-4 sm:px-6 flex-1">
                <h1>My Cart</h1>
                <h2>Review your Order</h2>
                <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y  border-b">
                  {/*// @ts-ignore*/}
                  {cart?.lineItems.map((item: any) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      // @ts-ignore
                      currencyCode={cart?.currency.code!}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="lg:col-span-4">
            <div className="flex-shrink-0 px-4 py-24 sm:px-6">
              <div className="border-t">
                <ul className="py-3">
                  <li className="flex justify-between py-1">
                    <span>Subtotal</span>
                    {/*// @ts-ignore*/}
                    <span>{cart?.subtotalPrice}</span>
                  </li>
                  <li className="flex justify-between py-1">
                    <span>Taxes</span>
                    <span>Calculated at checkout</span>
                  </li>
                  <li className="flex justify-between py-1">
                    <span>Estimated Shipping</span>
                    <span className="font-bold tracking-wide">FREE</span>
                  </li>
                </ul>
                <div className="flex justify-between border-t py-3 font-bold mb-10">
                  <span>Total</span>
                  {/*// @ts-ignore*/}
                  <span>{cart?.total}</span>
                </div>
              </div>
              <div className="flex flex-row justify-end">
                <div className="w-full lg:w-72">
                  <button
                    onClick={checkout}
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Procced to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer pages={[]} />
    </>
  );
}

Cart.Layout = Layout;
