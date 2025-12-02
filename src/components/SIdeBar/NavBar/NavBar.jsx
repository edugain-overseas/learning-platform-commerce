import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as NavTriangleIcon } from "../../../images/icons/navTriangle.svg";
import { navLinkActiveHandler } from "../../../utils/navLinkActiveHandler";
import styles from "./NavBar.module.scss";
import { useSelector } from "react-redux";
import { getAccessToken } from "../../../redux/user/selectors";

const NavBar = ({ navItems }) => {
  const isUserLoggedIn = useSelector(getAccessToken);

  return (
    <nav className={styles.nav}>
      <ul className={styles.navItems}>
        {navItems.map(({ label, link, icon }) => {
          if (link === "/education" && !isUserLoggedIn) return null;
          return (
            <li key={label} title={`${label} page`} className={styles.navItem}>
              <NavLink
                to={link}
                className={({ isActive }) =>
                  navLinkActiveHandler(isActive, styles)
                }
              >
                <div className={styles.narrowed}>
                  <button className={styles.navButton}>{icon}</button>
                </div>
                <div className={styles.expanded} id="expanded">
                  <span>{label}</span>
                  <NavTriangleIcon />
                </div>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
