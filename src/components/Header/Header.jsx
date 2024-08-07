import React from "react";
import { useSelector } from "react-redux";
import { getAccessToken, getUserType } from "../../redux/user/selectors";
import { useCart } from "../../context/cartContext";
import PrevLink from "./PrevLink/PrevLink";
import CurrentTime from "./CurrentTime/CurrentTime";
import AuthBtn from "./AuthBtn/AuthBtn";
import CartBtn from "./CartBtn/CartBtn";
import Badge from "../shared/Badge/Badge";
import Logo from "../Logo/Logo";
import UserPanel from "./UserPanel/UserPanel";
import styles from "./Header.module.scss";

const Header = () => {
  const { cartQuantity } = useCart();

  const accessToken = useSelector(getAccessToken);

  const isModer = useSelector(getUserType) === "moder";

  return (
    <header className={styles.header}>
      <div className={styles.leftNavLinks}>
        <Logo />
        <PrevLink />
      </div>
      <CurrentTime />
      <div className={styles.rightWrapper}>
        {accessToken ? <UserPanel /> : <AuthBtn />}
        {isModer ? null : (
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
