import React, { FC } from "react";
import Image from "next/image";
import s from "./ProductCard.module.css";
import Link from "next/link";
import { ProductForCard } from "@lib/bigcommerce/types/product";

interface ProductSliderProps {
  product: any;
  title?: string;
  description?: string;
}

export const ProductCard: FC<ProductSliderProps> = ({ product }) => {
  console.log("product", product);
  const image =
    product?.node?.defaultImage?.url640wide ||
    product?.node?.images?.edges[0]?.node?.urlOriginal ||
    "";

  let path = product?.node?.path || "";

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
                alt={"test"}
              />
            )}
          </div>
          <div className={s.name}>{product?.node?.name}</div>
          <div className={s.price}>{product?.node?.prices?.price?.value}</div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
