import React from "react";
import { Link } from "react-router-dom";
import LogOutBtn from "../../auth/LogOutBtn/LogOutBtn";
import { useSelector } from "react-redux";
import { getAccessToken } from "../../../redux/user/selectors";

const AuthBtn = () => {
  const token = useSelector(getAccessToken);

  return token ? (
    <LogOutBtn />
  ) : (
    <Link to="/login">
      <span>Sing in / Sing up</span>
    </Link>
  );
};

export default AuthBtn;
