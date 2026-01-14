import { ReactComponent as RegisterIcon } from "../../../images/icons/user.svg";
import { ReactComponent as LoginIcon } from "../../../images/icons/login.svg";
import { ReactComponent as EducationIcon } from "../../../images/icons/nav/my-education.svg";
import { ReactComponent as CoursesIcon } from "../../../images/icons/nav/all-courses.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAccessToken } from "../../../redux/user/selectors";
import styles from "../HomePage.module.scss";

const HeroAuthBtns = () => {
  const accessToken = useSelector(getAccessToken);

  return (
    <div className={styles.heroAuthBtns}>
      {accessToken ? (
        <>
          <Link className={styles.primaryBtn} to="/education">
            <span>My education</span>
            <EducationIcon />
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
