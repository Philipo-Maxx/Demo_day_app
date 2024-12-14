import React from "react";
import UsingHooks from "./payment";
import { useSelector } from "react-redux";
const PAYMENT = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  console.log(cartItems.items, "cartitems");
  let price = 0;
  cartItems.items.forEach((item) => {
    if (item.salePrice === 0) {
      price += item.quantity * item.price;
    } else {
      price += item.quantity * item.salePrice;
    }
  });

  console.log("price ", price);
  return (
    <div>
      <UsingHooks price={price} />
    </div>
  );
};

export { PAYMENT };
