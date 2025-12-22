import React, { useEffect, useState } from "react";
import AuthForm from "../shared/AuthForm/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../../redux/user/operations";
import { useLocation, useNavigate } from "react-router-dom";
import { getAccessToken } from "../../../redux/user/selectors";
import { useNotificationMessage } from "../../../hooks/useNotificationMessage";
import PasswordRecovery from "../PasswordRecovery/PasswordRecovery";
import styles from "./SingInForm.module.scss";

const SingInForm = () => {
  const [errorField, setErrorField] = useState("");
  const [messageApi, contextHolder] = useNotificationMessage();
  const [isResetPassword, setIsResetPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = useSelector(getAccessToken);

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [accessToken]);

  useEffect(() => {
    if (location.state?.message) {
      const { type, content } = location.state.message;
      messageApi[type]({ content, duration: 3 });
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (data) => {
    try {
      await dispatch(
        loginThunk({ credentials: data, messageApi, setErrorField, navigate })
      ).unwrap();

      const reopenCart = Boolean(location.state.openCartAfterLogin);

      location.state.from
        ? navigate(location.state.from, {
            replace: true,
            state: { reopenCart },
          })
        : navigate("/", {
            replace: true,
            state: { reopenCart },
          });
    } catch (error) {
      console.log(error);
    }
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
