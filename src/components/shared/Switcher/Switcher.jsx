import React from "react";
import styles from "./Switcher.module.scss";

const Switcher = ({
  items = [],
  onChange = () => {},
  value = 0,
  width = "56rem",
  height = "28rem",
}) => {
  
  const handleToggle = (index) => {
    onChange(index);
  };

  return (
    <div className={styles.wrapper} style={{ width, height }}>
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => handleToggle(index)}
          className={value === index ? styles.active : ""}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Switcher;
