import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as NavTriangleIcon } from "../../../images/icons/navTriangle.svg";
import styles from "./NavBar.module.scss";
import { navLinkActiveHandler } from "../../../utils/navLinkActiveHandler";

const NavBar = ({ navItems }) => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navItems}>
        {navItems.map(({ label, link, icon }) => (
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
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
