import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserType } from "../../redux/user/selectors";

const AdminPage = () => {
  const userType = useSelector(getUserType);
  console.log(userType);

  useEffect(() => {});

  return <div>AdminPage</div>;
};

export default AdminPage;
