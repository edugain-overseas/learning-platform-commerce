import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { activateUserThunk } from "../../../redux/user/operations";
import { createUser } from "../../../http/services/user";
import { getAccessToken } from "../../../redux/user/selectors";
import AuthForm from "../shared/AuthForm/AuthForm";
import EmailVerification from "../EmailVerification/EmailVerification";
import { useNavigate } from "react-router-dom";

const SingUpForm = () => {
  const [isVerificationEmail, setIsVerificationEmail] = useState(false);
  const [verificationData, setVerificationData] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [errorField, setErrorField] = useState("");
  const accessToken = useSelector(getAccessToken);

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) navigate("/");
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
        if (message.includes("username")) setErrorField("username");
        if (message.includes("email")) setErrorField("email");
        messageApi.open({
          type: "error",
          content: message,
        });
      }
    }
  };

  const handleSumbitVerification = (code) => {
    const credentials = {
      username: verificationData.username,
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

  const resetError = () => {
    setErrorField("");
  };

  return (
    <>
      {contextHolder}
      {isVerificationEmail ? (
        <EmailVerification
          handleSubmit={handleSumbitVerification}
          email={verificationData?.email}
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
