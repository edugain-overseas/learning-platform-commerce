import React from "react";
import PrevLink from "./PrevLink/PrevLink";
import CurrentTime from "./CurrentTime/CurrentTime";
import AuthBtn from "./AuthBtn/AuthBtn";
import CartBtn from "./CartBtn/CartBtn";
import Badge from "../shared/Badge/Badge";
import { useCart } from "../../context/cartContext";
import styles from "./Header.module.scss";
import Logo from "../Logo/Logo";

const Header = () => {
  const { cartQuantity } = useCart();
  return (
    <header className={styles.header}>
      <Logo />
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
