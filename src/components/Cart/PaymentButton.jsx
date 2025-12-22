import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../redux/user/selectors";
import { useCart } from "../../context/cartContext";
import { ReactComponent as CartIcon } from "../../images/icons/cart.svg";
import { getPaymentLink } from "../../http/services/user";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import styles from "./Cart.module.scss";

const PaymentButton = () => {
  const { cartQuantity, handleClose, cartItems } = useCart();
  const [isLoading, setIsloading] = useState(false);
  const studentId = useSelector(getUserInfo).studentId;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleStripePay = async () => {
    setIsloading(true);
    const origin = window.origin;
    const success_url = `${origin}/payment?status=success&session_id={CHECKOUT_SESSION_ID}`;
    const cancel_url = `${origin}/payment?status=cancel`;
    const paymentItems = cartItems
      .filter((item) => item.checked)
      .map((item) => item.id);
    console.log(paymentItems);

    try {
      const response = await getPaymentLink(
        studentId,
        paymentItems,
        success_url,
        cancel_url
      );
      const paymentLink = response.link;
      console.log(paymentLink);

      window.location = paymentLink;
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  const handlePay = async () => {
    if (studentId) {
      await handleStripePay();
    } else {
      handleClose();
      navigate("/login", {
        state: {
          message: {
            type: "warning",
            content: "Please sign in to continue",
            duration: 3,
          },
          from: pathname,
          openCartAfterLogin: true,
        },
      });
    }
  };

  return (
    <button
      className={styles.paymentBtn}
      onClick={cartQuantity === 0 ? handleClose : handlePay}
      disabled={isLoading}
    >
      {isLoading ? (
        <Spinner height={16} />
      ) : (
        <>
          <span>{cartQuantity === 0 ? "Continue shopping" : "Checkout"}</span>
          <CartIcon />
        </>
      )}
    </button>
  );
};

export default PaymentButton;
