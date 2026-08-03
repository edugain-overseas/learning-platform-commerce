import { ReactComponent as WhatsupIcon } from "../../images/icons/social/whatsup.svg";
import { ReactComponent as EmailIcon } from "../../images/icons/social/email.svg";
import { ReactComponent as LocationIcon } from "../../images/icons/social/location.svg";
import { ReactComponent as FacebookIcon } from "../../images/icons/social/facebook.svg";
import { ReactComponent as InstagramIcon } from "../../images/icons/social/instagram.svg";
import styles from "../HomePage/HomePage.module.scss";

const Contacts = () => {
  return (
    <div style={{ padding: "100rem 70rem" }}>
      <ul className={styles.socialLinks}>
        <li className={styles.contact}>
          <WhatsupIcon />
          <span className={styles.label}>Phone number:</span>
          <a
            href="https://wa.me/+380964627777"
            target="_blank"
            rel="noreferrer noopener"
          >
            +380 96 462 77 77
          </a>
        </li>
        <li className={styles.contact}>
          <EmailIcon />
          <span className={styles.label}>Email address:</span>
          <a
            href="mailto:courses@feu.com.ua"
            target="_blank"
            rel="noreferrer noopener"
          >
            courses@feu.com.ua
          </a>
        </li>
        <li className={styles.contact}>
          <LocationIcon />
          <span className={styles.label}>Our office:</span>
          <a href="/" target="_blank" rel="noreferrer noopener">
            Academician Glushkova Avenue.42, Kyiv 03187
          </a>
        </li>
        <li className={styles.socialContainer}>
          <span>Follow us:</span>
          <a
            href="https://www.facebook.com/profile.php?id=61591024424081"
            target="_blank"
            rel="noreferrer noopener"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://www.instagram.com/feu.courses/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <InstagramIcon />
          </a>
          {/* <a href="/" target="_blank" rel="noreferrer noopener">
                <LinkedinIcon />
              </a>
              <a href="/" target="_blank" rel="noreferrer noopener">
                <YoutubeIcon />
              </a>
              <a href="/" target="_blank" rel="noreferrer noopener">
                <TiktokIcon />
              </a> */}
        </li>
      </ul>
    </div>
  );
};

export default Contacts;
