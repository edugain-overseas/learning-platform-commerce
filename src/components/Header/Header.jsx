import React from "react";
import PrevLink from "./PrevLink/PrevLink";
import CurrentTime from "./CurrentTime/CurrentTime";
import AuthBtn from "./AuthBtn/AuthBtn";
import CartBtn from "./CartBtn/CartBtn";
import { useCart } from "../../context/cartContext";
import styles from "./Header.module.scss";
import Badge from "../shared/Badge/Badge";

const Header = () => {
  const { cartQuantity } = useCart();
  console.log(cartQuantity);
  return (
    <header className={styles.header}>
      <PrevLink />
      <CurrentTime />
      <div className={styles.rightWrapper}>
        <AuthBtn />
        {cartQuantity > 0 && (
          <Badge
            value={cartQuantity < 100 ? cartQuantity : 99}
            type="filled"
            pulsing={true}
          >
            <CartBtn />
          </Badge>
        )}
      </div>
    </header>
  );
};

export default Header;
