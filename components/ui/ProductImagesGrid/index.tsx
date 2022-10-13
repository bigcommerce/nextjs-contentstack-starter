import React, { ReactElement } from "react";
import Image from "next/image";
import styles from "./ProductImagesGrid.module.css";

// https://matemarschalko.medium.com/css-only-interactive-swipeable-image-carousel-3a38afe3da58

const ProductImagesGrid = ({ product }: any): ReactElement => {
  return (
    <div className={styles.root}>
      <ul className={styles.imageGrid}>
        {product?.product?.images?.edges.map((image: any, idx: any) => (
          <li className={styles.tile} key={idx}>
            <Image
              src={image?.node?.urlOriginal!}
              alt={image?.node?.alt || "Product Image"}
              width={600}
              height={600}
              priority={idx === 0}
              quality="85"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductImagesGrid;
