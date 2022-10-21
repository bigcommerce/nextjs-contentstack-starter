import { Product } from "@lib/bigcommerce/types/product";
import { ProductInfoFragment } from "@bigcommerce/storefront-data-hooks/schema";
import { images } from "next/dist/build/webpack/config/blocks/images";

export const normalizeProductCard = (node: ProductInfoFragment): Product => {
  const id = String(node.entityId);
  const slug = node.path;
  const productPath = `/product/${slug}`;

  return {
    id: id,
    objectID: id,
    path: productPath,
    slug: slug,
    description: node.description,
    images: images(node.images),
    name: node.name,
  };
};
