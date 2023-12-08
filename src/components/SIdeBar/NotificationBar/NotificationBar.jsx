import React from "react";
import { ReactComponent as ChatIcon } from "../../../images/icons/chat.svg";
import { NavLink } from "react-router-dom";
import { navLinkActiveHandler } from "../../../utils/navLinkActiveHandler";
import styles from "./NotificationBar.module.scss";

const NotificationBar = () => {
  return (
    <div className={styles.mainWrapper}>
      <NavLink
        to={"/class-rooms-notification"}
        className={({ isActive }) => navLinkActiveHandler(isActive, styles)}
      >
        <ChatIcon />
        <p>Class rooms notification</p>
      </NavLink>
      <NavLink
      to={"/notification-from-curator"}
        className={({ isActive }) => navLinkActiveHandler(isActive, styles)}
      >
        <ChatIcon />
        <p>Notification from curator</p>
      </NavLink>
      <NavLink
      to={"/students-support-center"}
        className={({ isActive }) => navLinkActiveHandler(isActive, styles)}
      >
        <ChatIcon />
        <p>Students Support Center</p>
      </NavLink>
    </div>
  );
};

export default NotificationBar
