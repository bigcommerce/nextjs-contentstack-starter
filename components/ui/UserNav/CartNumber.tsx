import useCart from "@bigcommerce/storefront-data-hooks/cart/use-cart";

const countItem = (count: number, item: any) => count + item.quantity;
const countItems = (count: number, items: any[]) =>
  items.reduce(countItem, count);

export const CartNumber = () => {
  const { data } = useCart();
  const itemsCount = Object.values(data?.line_items ?? {}).reduce(
    countItems,
    0
  );

  console.log("itemsCount", itemsCount);

  return itemsCount > 0 ? <span>{itemsCount}</span> : null;
};
