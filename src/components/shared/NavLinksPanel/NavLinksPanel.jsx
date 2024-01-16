import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinkActiveHandler } from "../../../utils/navLinkActiveHandler";
import styles from "./NavLinksPanel.module.scss";

export default function NavLinksPanel({ renderLinks }) {
  const wrapperRef = useRef(null);
  const [markerProps, setMarkerProps] = useState({
    left: "16rem",
    width: "106.8rem",
  });

  const handleClick = (e, index) => {
    const links = [...e.target.parentElement.children];
    links.pop();
    const left = links.reduce((left, element, elemIndex) => {
      if (elemIndex < index) {
        return left + element.offsetWidth;
      }
      return left;
    }, 0);
    const newMarkerProps = {
      left: `calc(${left}px + ${index * 40}rem + 16rem)`,
      width: `${e.target.offsetWidth}px`,
    };
    setMarkerProps(newMarkerProps);
  };

  return (
    <div className={styles.navBarWrapper} ref={wrapperRef}>
      {renderLinks.map((link, index) => (
        <NavLink
          key={index}
          className={({ isActive }) => navLinkActiveHandler(isActive, styles)}
          to={link.to}
          onClick={(e) => handleClick(e, index)}
        >
          {link.content}
        </NavLink>
      ))}
      <div
        className={styles.activeLinkMarker}
        style={{
          width: markerProps.width,
          left: markerProps.left,
        }}
      ></div>
    </div>
  );
}
