import s from "./ProductView.module.css";
import React, { FC } from "react";
import ProductCard from "../ProductCard";
import { Container } from "@components/ui";
import ProductSidebar from "../ProductSidebar";
import ProductImagesGrid from "../ProductImagesGrid";
import Image from "next/image";

interface ProductViewProps {
  product: any;
  relatedProducts: any[] | any[];
}

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts }) => {
  const rawHtml = String(product?.product?.description)
    .toString()
    .replace(/<div>&nbsp;<\/div>/g, "");
  const goodHtmlDescription = { __html: rawHtml };

  console.log("product", product?.product?.prices?.price?.value);
  const addToCart = async () => {
    try {
      fetch(`/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product?.product),
      }).finally(() => {});
    } catch (error) {
      //display error
      console.error("Error updating the product: ", error);
    }
  };

  return (
    <Container>
      <div>
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <div className="flex flex-col-reverse">
              <div className="aspect-w-1 aspect-h-1 w-full">
                <div
                  id="tabs-1-panel-1"
                  aria-labelledby="tabs-1-tab-1"
                  role="tabpanel"
                >
                  <Image
                    className="h-full  w-full object-cover object-center sm:rounded-lg"
                    alt={product?.product?.name}
                    src={product?.product?.images?.edges[0]?.node?.urlOriginal}
                    height={900}
                    width={800}
                    quality="75"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product?.product?.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  ${product?.product?.prices?.price?.value}
                </p>
              </div>
              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6 text-base text-gray-700">
                  <div
                    className={"grid grid-cols-auto md:grid-cols-1"}
                    dangerouslySetInnerHTML={goodHtmlDescription}
                  ></div>{" "}
                </div>
              </div>

              <form className="mt-6">
                <div>
                  <h3 className="text-sm text-gray-600">Color</h3>

                  <fieldset className="mt-2">
                    <legend className="sr-only">Choose a color</legend>
                    <span className="flex items-center space-x-3">
                      <label className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-700">
                        {/*<input*/}
                        {/*  type="radio"*/}
                        {/*  name="color-choice"*/}
                        {/*  value="Washed Black"*/}
                        {/*  className="sr-only"*/}
                        {/*  aria-labelledby="color-choice-0-label"*/}
                        {/*>*/}
                        {/*  {" "}*/}
                        {/*</input>*/}

                        <span id="color-choice-0-label" className="sr-only">
                          {" "}
                          Washed Black{" "}
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-8 w-8 bg-gray-700 border border-black border-opacity-10 rounded-full"
                        ></span>
                      </label>
                      <label className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400">
                        {/*<input type="radio" name="color-choice" value="White" className="sr-only"*/}
                        {/*       aria-labelledby="color-choice-1-label">*/}
                        <span id="color-choice-1-label" className="sr-only">
                          {" "}
                          White{" "}
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-8 w-8 bg-white border border-black border-opacity-10 rounded-full"
                        ></span>
                      </label>
                      <label className="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-500">
                        {/*<input type="radio" name="color-choice" value="Washed Gray" className="sr-only"*/}
                        {/*       aria-labelledby="color-choice-2-label">*/}
                        <span id="color-choice-2-label" className="sr-only">
                          {" "}
                          Washed Gray{" "}
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-8 w-8 bg-gray-500 border border-black border-opacity-10 rounded-full"
                        ></span>
                      </label>
                    </span>
                  </fieldset>
                </div>

                <div className="sm:flex-col1 mt-10 flex">
                  <button
                    onClick={addToCart}
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Add to cart
                  </button>
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                  <div>
                    <h3>
                      <button
                        type="button"
                        className="group relative flex w-full items-center justify-between py-6 text-left"
                        aria-controls="disclosure-1"
                        aria-expanded="false"
                      >
                        <span className="text-gray-900 text-sm font-medium">
                          Features
                        </span>
                        <span className="ml-6 flex items-center">
                          <svg
                            className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                          <svg
                            className="hidden h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M19.5 12h-15"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    <div className="prose prose-sm pb-6" id="disclosure-1">
                      <ul role="list">
                        <li>Multiple strap configurations</li>

                        <li>Spacious interior with top zip</li>

                        <li>Leather handle and tabs</li>

                        <li>Interior dividers</li>

                        <li>Stainless strap loops</li>

                        <li>Double stitched construction</li>

                        <li>Water-resistant</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <section className="py-12 px-6 mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          You may be interested in
        </h1>
        <div className={s.relatedProductsGrid}>
          {relatedProducts.map((p) => (
            <div key={p.name}>
              <ProductCard product={p} key={p.path} />
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default ProductView;
