import React from "react";
import { Link } from "react-router-dom";

const LogOutBtn = () => {
  return (
    <Link to="/user">
      <span>Log out</span>
    </Link>
  );
};

export default LogOutBtn;
