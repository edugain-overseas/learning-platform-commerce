import React from "react";
import styles from "./CommonButton.module.scss";

const variants = {
  grey: "grey",
  lightGrey: "lightGrey",
  darkBlue: "darkBlue",
  lightBlue: "lightBlue",
  red: "red",
  green: "green",
  transparentTextLight: "transparentTextLight",
  transparentTextDark: "transparentTextDark",
};

const CommonButton = ({
  text = "",
  icon = null,
  variant = variants.lightGrey,
  hoverVariant = variants.darkBlue,
  className = "",
  onClick,
  wrapperStyles = {},
  disabled = false,
}) => {
  return (
    <button
      className={`${styles.commonButton} ${styles[variant]} ${
        styles[`hover-${hoverVariant}`]
      } ${className}`}
      onClick={onClick}
      style={{ ...wrapperStyles }}
      disabled={disabled}
    >
      <span>{text}</span>
      {icon}
    </button>
  );
};

export default CommonButton;
