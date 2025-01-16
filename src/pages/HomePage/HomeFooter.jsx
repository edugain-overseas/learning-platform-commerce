import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as WhatsupIcon } from "../../images/icons/social/whatsup.svg";
import { ReactComponent as EmailIcon } from "../../images/icons/social/email.svg";
import { ReactComponent as LocationIcon } from "../../images/icons/social/location.svg";
import { ReactComponent as FacebookIcon } from "../../images/icons/social/facebook.svg";
import { ReactComponent as InstagramIcon } from "../../images/icons/social/instagram.svg";
import { ReactComponent as LinkedinIcon } from "../../images/icons/social/linkedin.svg";
import { ReactComponent as YoutubeIcon } from "../../images/icons/social/youtube.svg";
import { ReactComponent as TiktokIcon } from "../../images/icons/social/tiktok.svg";
import ContactForm from "../../components/ContactForm/ContactForm";
import styles from "./HomePage.module.scss";

const HomeFooter = () => {
  return (
    <footer className={styles.footer}>
      <ContactForm wrapperClassname={styles.footerForm} />
      <div className={styles.sectionContainer}>
        <div className={styles.footerLinks}>
          <p>
            <b>If you have any additional questions</b> and want to get
            additional advice, our specialists will be able to provide you with
            the necessary support when working or starting to work on the IEU
            educational platform. We are always happy to help you.
          </p>
          <ul className={styles.socialLinks}>
            <li className={styles.contact}>
              <WhatsupIcon />
              <span className={styles.label}>Phone number:</span>
              <a
                href="https://wa.me/+35677215496"
                target="_blank"
                rel="noreferrer noopener"
              >
                +356 7721 5496
              </a>
            </li>
            <li className={styles.contact}>
              <EmailIcon />
              <span className={styles.label}>Email address:</span>
              <a
                href="mailto:info@ieu.edu.ua"
                target="_blank"
                rel="noreferrer noopener"
              >
                info@ieu.edu.ua
              </a>
            </li>
            <li className={styles.contact}>
              <LocationIcon />
              <span className={styles.label}>Our office:</span>
              <a href="/" target="_blank" rel="noreferrer noopener">
                151 triq Edgar Bernard, Malta
              </a>
            </li>
            <li className={styles.socialContainer}>
              <span>Follow us:</span>
              <a href="/" target="_blank" rel="noreferrer noopener">
                <FacebookIcon />
              </a>
              <a href="/" target="_blank" rel="noreferrer noopener">
                <InstagramIcon />
              </a>
              <a href="/" target="_blank" rel="noreferrer noopener">
                <LinkedinIcon />
              </a>
              <a href="/" target="_blank" rel="noreferrer noopener">
                <YoutubeIcon />
              </a>
              <a href="/" target="_blank" rel="noreferrer noopener">
                <TiktokIcon />
              </a>
            </li>
            <li className={styles.singleLink}>
              <a href="/" target="_blank" rel="noreferrer noopener">
                Privacy policy
              </a>
            </li>
            <li className={styles.singleLink}>
              <Link to="/aboutIEU">About IEU</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
