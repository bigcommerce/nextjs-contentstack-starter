import React, { FC } from "react";
import Image from "next/image";
import s from "./ProductCard.module.css";
import Link from "next/link";
import { Product, ProductForCard } from "@lib/bigcommerce/types/product";

interface ProductSliderProps {
  product: Product;
  title?: string;
  description?: string;
}

export const ProductCard: FC<ProductSliderProps> = ({ product }) => {
  console.log("product", product);

  //This is a good use case to normalize your data from different sources.
  const image =
    product?.defaultImage?.url640wide ||
    // @ts-ignore
    product?.images?.edges[0]?.node?.urlOriginal ||
    "";

  let path = product?.path || "";

  return (
    <>
      <Link href={`/product/${path}`}>
        <div className={s.productCard}>
          <div className={s.productImageContainer}>
            {image && (
              <Image
                className={s.productImage}
                src={image}
                layout={"fill"}
                alt={product?.name}
              />
            )}
          </div>
          <div className={s.name}>{product?.name}</div>
          <div className={s.price}>{product?.prices?.listPrice}</div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
