import React, { useState } from "react";
import AuthForm from "../shared/AuthForm/AuthForm";
import { useDispatch } from "react-redux";
import { activateUserThunk } from "../../../redux/user/operations";
import EmailVerification from "../EmailVerification/EmailVerification";
import { createUser } from "../../../http/services/user";

const SingUpForm = () => {
  const [isVerificationEmail, setIsVerificationEmail] = useState(false);
  const [verificationData, setVerificationData] = useState(null);

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
      setVerificationData({ username: data.username, email: data.email });
      setIsVerificationEmail(true);
    } catch (error) {
      console.error("Axios Error:", error);
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

  return isVerificationEmail ? (
    <EmailVerification
      handleSubmit={handleSumbitVerification}
      email={verificationData?.email}
    />
  ) : (
    <AuthForm handleSubmit={handleSubmit} type="registration" />
  );
};

export default SingUpForm;
