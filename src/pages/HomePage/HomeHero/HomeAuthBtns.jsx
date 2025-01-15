import { ReactComponent as RegisterIcon } from "../../../images/icons/user.svg";
import { ReactComponent as LoginIcon } from "../../../images/icons/login.svg";
import { Link } from "react-router-dom";
import styles from "../HomePage.module.scss";

const HeroAuthBtns = () => {
  return (
    <div className={styles.heroAuthBtns}>
      <Link className={styles.register} to="registration">
        <span>Register</span>
        <RegisterIcon />
      </Link>
      <Link className={styles.login} to="login">
        <span>Log in</span>
        <LoginIcon />
      </Link>
    </div>
  );
};

export default HeroAuthBtns;
