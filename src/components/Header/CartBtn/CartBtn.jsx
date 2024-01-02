import React from "react";
import styles from "./CartBtn.module.scss";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCart } from "../../../context/cartContext";

const CartBtn = () => {
  const { handleOpen } = useCart();
  return (
    <button className={styles.cartBtn} onClick={handleOpen}>
      <ShoppingCartOutlined className={styles.icon} />
    </button>
  );
};

export default CartBtn;
