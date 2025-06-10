import { ReactComponent as RegisterIcon } from "../../../images/icons/user.svg";
import { ReactComponent as LoginIcon } from "../../../images/icons/login.svg";
import { ReactComponent as ProfileIcon } from "../../../images/icons/myProfile.svg";
import { ReactComponent as LogoutIcon } from "../../../images/icons/logout.svg";
import { Link, useNavigate } from "react-router-dom";
import styles from "../HomePage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../../../redux/user/selectors";
import { logoutThunk } from "../../../redux/user/operations";
import { instance } from "../../../http/instance";

const HeroAuthBtns = () => {
  const accessToken = useSelector(getAccessToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutThunk())
      .unwrap()
      .then(() => {
        instance.defaults.headers.Authorization = null;
        navigate("/login");
      });
  };

  return (
    <div className={styles.heroAuthBtns}>
      {accessToken ? (
        <>
          <Link className={styles.register} to="/me">
            <span>My profile</span>
            <ProfileIcon />
          </Link>
          <button className={styles.login} onClick={handleLogout}>
            <span>Log out</span>
            <LogoutIcon />
          </button>
        </>
      ) : (
        <>
          <Link className={styles.register} to="/registration">
            <span>Register</span>
            <RegisterIcon />
          </Link>
          <Link className={styles.login} to="/login">
            <span>Log in</span>
            <LoginIcon />
          </Link>
        </>
      )}
    </div>
  );
};

export default HeroAuthBtns;
