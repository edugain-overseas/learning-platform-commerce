import React from "react";
import AuthForm from "../shared/AuthForm/AuthForm";
import { useDispatch } from "react-redux";
import { createUserThunk } from "../../../redux/user/operations";

const SingUpForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (data) => {
    const credentials = {
      name: data.firstname,
      surname: data.lastname,
      username: data.username,
      email: data.email,
      password: data.password,
    };
    console.log(credentials);

    dispatch(createUserThunk(credentials));
  };

  return <AuthForm handleSubmit={handleSubmit} type="registration" />;
};

export default SingUpForm;
