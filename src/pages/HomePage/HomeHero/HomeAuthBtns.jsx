import { ReactComponent as RegisterIcon } from "../../../images/icons/user.svg";
import { ReactComponent as LoginIcon } from "../../../images/icons/login.svg";
import { ReactComponent as CoursesIcon } from "../../../images/icons/courses.svg";
// import { ReactComponent as LogoutIcon } from "../../../images/icons/logout.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAccessToken } from "../../../redux/user/selectors";
// import { logoutThunk } from "../../../redux/user/operations";
// import { instance } from "../../../http/instance";
// import CommonButton from "../../../components/shared/CommonButton/CommonButton";
import styles from "../HomePage.module.scss";

const HeroAuthBtns = () => {
  const accessToken = useSelector(getAccessToken);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   dispatch(logoutThunk())
  //     .unwrap()
  //     .then(() => {
  //       instance.defaults.headers.Authorization = null;
  //       navigate("/login");
  //     });
  // };

  return (
    <div className={styles.heroAuthBtns}>
      {accessToken ? (
        <>
          <Link className={styles.primaryBtn} to="/education">
            <span>My education</span>
            <CoursesIcon />
          </Link>
          <Link className={styles.secondaryBtn} to="/courses">
            <span>All courses</span>
            <CoursesIcon />
          </Link>
        </>
      ) : (
        <>
          <Link className={styles.primaryBtn} to="/registration">
            <span>Register</span>
            <RegisterIcon />
          </Link>
          <Link className={styles.secondaryBtn} to="/login">
            <span>Log in</span>
            <LoginIcon />
          </Link>
        </>
      )}
    </div>
  );
};

export default HeroAuthBtns;
