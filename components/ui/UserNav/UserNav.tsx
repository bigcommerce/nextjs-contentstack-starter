import { FC } from "react";
import cn from "classnames";
import { Bag } from "@components/icons";
import s from "./UserNav.module.css";
import { Cart, LineItem } from "@lib/bigcommerce/types/cart";
import Link from "next/link";
import useCart from "@lib/bigcommerce/hooks/use-cart";

interface Props {
  className?: string;
}

const UserNav: FC<Props> = ({ className, children, ...props }) => {
  const countItem = (count: number, item: LineItem) => count + item.quantity;
  var itemsCount = 0;

  const { cart, isLoading, isError } = useCart();
  if (cart) {
    itemsCount = cart?.lineItems.reduce(countItem, 0) ?? 0;
  }
  return (
    <nav className={cn(s.root, className)}>
      <div className={s.mainContainer}>
        <ul className={s.list}>
          <Link href={`/cart`}>
            <li className={s.item}>
              <Bag />
              <span className={s.bagCount}>{itemsCount}</span>
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default UserNav;
