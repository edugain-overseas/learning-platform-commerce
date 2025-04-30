import React, { useEffect, useState } from "react";
import AuthForm from "../shared/AuthForm/AuthForm";
import styles from "./SingInForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../../redux/user/operations";
import { useLocation, useNavigate } from "react-router-dom";
import { getAccessToken } from "../../../redux/user/selectors";
import { message } from "antd";
import PasswordRecovery from "../PasswordRecovery/PasswordRecovery";
import { useCart } from "../../../context/cartContext";

const SingInForm = () => {
  const [errorField, setErrorField] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [isResetPassword, setIsResetPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const { handleOpen } = useCart();

  const accessToken = useSelector(getAccessToken);

  useEffect(() => {
    if (accessToken) {
      if (location.state?.from) {
        navigate(location.state?.from);
        location.state?.navigateFromCart && handleOpen();
      }
      navigate("/");
    }
    // eslint-disable-next-line
  }, [accessToken]);

  const handleSubmit = (data) => {
    dispatch(
      loginThunk({ credentials: data, messageApi, setErrorField, navigate })
    );
  };

  const resetError = () => {
    setErrorField("");
  };

  return (
    <div className={styles.pageWrapper}>
      {contextHolder}
      {isResetPassword ? (
        <PasswordRecovery messageApi={messageApi} />
      ) : (
        <AuthForm
          handleSubmit={handleSubmit}
          type="login"
          errorField={errorField}
          resetError={resetError}
          setIsResetPassword={setIsResetPassword}
        />
      )}
    </div>
  );
};

export default SingInForm;
