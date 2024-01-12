import React from "react";
import { NavLink } from "react-router-dom";
import { sidebarNav } from "../../../costants/nav";
import { ReactComponent as NavTriangleIcon } from "../../../images/icons/navTriangle.svg";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navItems}>
        {sidebarNav.map(({ label, link, icon }) => (
          <li key={label} title={`${label} page`} className={styles.navItem}>
            <NavLink to={link} className={styles.navLink}>
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
