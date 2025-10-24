import React, { useLayoutEffect, useState } from "react";
import { useNotificationMessage } from "../../../hooks/useNotificationMessage";
import { useDispatch, useSelector } from "react-redux";
import { activateUserThunk } from "../../../redux/user/operations";
import { createUser, resendActivationCode } from "../../../http/services/user";
import { getAccessToken } from "../../../redux/user/selectors";
import AuthForm from "../shared/AuthForm/AuthForm";
import EmailVerification from "../EmailVerification/EmailVerification";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/cartContext";

const SingUpForm = () => {
  const [isVerificationEmail, setIsVerificationEmail] = useState(false);
  const [verificationData, setVerificationData] = useState(null);
  const [messageApi, contextHolder] = useNotificationMessage();
  const [errorField, setErrorField] = useState("");
  const accessToken = useSelector(getAccessToken);

  const location = useLocation();
  const { handleOpen } = useCart();

  const query = location.search;
  const isVerificationEmailFromQuery = new URLSearchParams(query).get(
    "verification"
  );
  const usernameFromQuery = new URLSearchParams(query).get("username");

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (accessToken) {
      if (location.state?.from) {
        navigate(location.state.from);
        location.state.navigateFromCart && handleOpen();
      }
      navigate("/");
    }
    // eslint-disable-next-line
  }, [accessToken]);

  const dispatch = useDispatch();

  const handleSubmit = async (data) => {
    const credentials = {
      name: data.firstname,
      surname: data.lastname,
      username: data.username,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await createUser(credentials);
      console.log(response);
      if (response.status === 201) {
        messageApi.open({ type: "success", content: response.data.message });
      }
      setVerificationData({ username: data.username, email: data.email });
      setIsVerificationEmail(true);
    } catch (error) {
      console.error("Axios Error:", error);
      const message = error.response.data.detail;

      if (error.response.status === 422) {
        messageApi.open({
          type: "error",
          content: message,
        });
        if (message === `User with email ${credentials.email} does exist`)
          navigate(
            `/login?username=${credentials.username}&email=${credentials.email}`
          );
        if (message.includes("username")) setErrorField("username");
        if (message.includes("email")) setErrorField("email");
      }
    }
  };

  const handleSumbitVerification = (code) => {
    const credentials = {
      username: usernameFromQuery
        ? usernameFromQuery
        : verificationData.username,
      code,
    };

    try {
      dispatch(activateUserThunk(credentials)).then((response) =>
        console.log(response)
      );
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  const handleResendActivationCode = async () => {
    try {
      const response = await resendActivationCode(
        usernameFromQuery ? usernameFromQuery : verificationData.username
      );
      const message = response.data.message;
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: `${message} ${
            verificationData.email && verificationData.email
          }`,
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Something went wrong. Please try again",
      });
    }
  };

  const resetError = () => {
    setErrorField("");
  };

  return (
    <>
      {contextHolder}
      {isVerificationEmail || isVerificationEmailFromQuery ? (
        <EmailVerification
          handleSubmit={handleSumbitVerification}
          email={verificationData?.email}
          handleResendActivationCode={handleResendActivationCode}
        />
      ) : (
        <AuthForm
          handleSubmit={handleSubmit}
          type="registration"
          errorField={errorField}
          resetError={resetError}
        />
      )}
    </>
  );
};

export default SingUpForm;
