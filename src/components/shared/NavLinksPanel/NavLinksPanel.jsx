import React from "react";
import { NavLink } from "react-router-dom";
import { navLinkActiveHandler } from "../../../utils/navLinkActiveHandler";
import styles from "./NavLinksPanel.module.scss";

export default function NavLinksPanel({ renderLinks }) {
  return (
    <div className={styles.navBarWrapper}>
      {renderLinks.map((link, index) => (
        <NavLink
          key={index}
          className={({ isActive }) => navLinkActiveHandler(isActive, styles)}
          to={link.to}
        >
          {link.content}
        </NavLink>
      ))}
    </div>
  );
}
