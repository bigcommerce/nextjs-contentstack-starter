import s from "./ProductView.module.css";
import React, { FC } from "react";
import ProductCard from "../ProductCard";
import { Container } from "@components/ui";
import Image from "next/image";

interface ProductViewProps {
  product: any;
  relatedProducts: any[];
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
      <div className="mx-auto  py-16 px-4 px-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex">
            <Image
              alt={product?.product?.name}
              src={product?.product?.images?.edges[0]?.node?.urlOriginal}
              height={900}
              width={800}
              quality="75"
            />
          </div>

          <div className="mt-10 px-4 lg:mt-0">
            <h1 className="text-3xl font-bold text-black">
              {product?.product?.name}
            </h1>

            <div className="mt-3">
              <p className="text-3xl text-black">
                ${product?.product?.prices?.price?.value}
              </p>
            </div>
            <div className="mt-6">
              <h3>Description</h3>
              <div className="space-y-6 text-base text-gray-700">
                <div
                  className={"grid grid-cols-auto md:grid-cols-1"}
                  dangerouslySetInnerHTML={goodHtmlDescription}
                ></div>{" "}
              </div>
            </div>

            <div className="mt-10 flex">
              <button
                onClick={addToCart}
                className="flex max-w-xs flex-1 items-center justify-center rounded-md bg-black py-3 px-8 font-bold text-white"
              >
                Add to cart
              </button>
            </div>

            <section aria-labelledby="details-heading" className="mt-12">
              <div className="divide-y divide-gray-200 border-t">
                <div></div>
              </div>
            </section>
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
