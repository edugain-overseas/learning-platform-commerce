import React from "react";
import { useCart } from "../../../context/cartContext";
import { ReactComponent as CartIcon } from "../../../images/icons/cart.svg";
import { priceFormatter } from "../../../utils/priceFormatter";
import CommonButton from "../../shared/CommonButton/CommonButton";

const CartBtn = () => {
  const { handleOpen, totalPrice } = useCart();
  return (
    <CommonButton
      text={`$ ${priceFormatter(totalPrice)}`}
      icon={<CartIcon style={{ width: "24rem", height: "24rem" }} />}
      onClick={handleOpen}
    />
  );
};

export default CartBtn;
