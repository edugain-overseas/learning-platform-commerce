import React from "react";
import { ReactComponent as LogoutIcon } from "../../../images/icons/logout.svg";
import styles from "./LogoutButton.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken, getUserError } from "../../../redux/user/selectors";
import { logoutThunk } from "../../../redux/user/operations";
import { instance } from "../../../http/instance";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(getAccessToken);
  const navigate = useNavigate();
  const error = useSelector(getUserError);

  const handleLogout = () => {
    if (accessToken) {
      dispatch(logoutThunk()).then(() => {
        if (!error) {
          instance.defaults.headers.Authorization = null;
          navigate("/login");
        }
      });
    } else {
      navigate("/login");
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.narrowed}>
        <button type="button" onClick={handleLogout}>
          <LogoutIcon />
        </button>
      </div>
      <div className={styles.expanded} id="expanded">
        <button onClick={handleLogout}>
          <span className={styles.icon}>
            <LogoutIcon />
          </span>
          <span className={styles.label}>
            {accessToken ? "Log out" : "Sing in"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default LogoutButton;
