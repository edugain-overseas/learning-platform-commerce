import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../../context/cartContext";
import { useDispatch } from "react-redux";
import { getCoursesThunk } from "../../redux/course/operations";
import { subscribeCourses } from "../../http/services/user";
import { getUserInfoThunk } from "../../redux/user/operations";
import Spinner from "../../components/Spinner/Spinner";
import Success from "./Success";
import Cancel from "./Cancel";
import styles from "./PaymentPage.module.scss";

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const sessionId = searchParams.get("session_id");
  const [isLoading, setIsLoading] = useState(true);
  const { removeItem } = useCart();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSubscribeCourses = async () => {
      try {
        const response = await subscribeCourses(sessionId);
        const items = response.items;

        if (Array.isArray(items)) {
          items.forEach((item) => removeItem(item));
        }

        await dispatch(getCoursesThunk()).unwrap();
        await dispatch(getUserInfoThunk()).unwrap();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "success") {
      handleSubscribeCourses();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, [status, sessionId]);

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Spinner />
      ) : status === "success" ? (
        <Success />
      ) : (
        <Cancel />
      )}
    </div>
  );
};

export default PaymentPage;
