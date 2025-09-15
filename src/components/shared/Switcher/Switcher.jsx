import React, { useState } from "react";
import styles from "./Switcher.module.scss";
import { pxToRem } from "../../../utils/remToPx";

const Switcher = ({
  items = [],
  onChange = () => {},
  value = 0,
  width = "56rem",
  height = "28rem",
}) => {
  const [indicatorCoords, setIndicatorCoords] = useState({
    width: 22,
    height: 22,
    left: 3,
  });

  const handleToggle = (e, index) => {
    console.dir(e.currentTarget);
    const {
      offsetWidth: width,
      offsetHeight: height,
      offsetLeft: left,
    } = e.currentTarget;

    setIndicatorCoords({
      width: pxToRem(width),
      height: pxToRem(height),
      left: pxToRem(left),
    });
    onChange(index);
  };

  return (
    <div className={styles.wrapper} style={{ width, height }}>
      <div
        className={styles.indicator}
        style={{
          width: `${indicatorCoords.width}rem`,
          height: `${indicatorCoords.height}rem`,
          transform: `translateX(${indicatorCoords.left}rem)`,
        }}
      ></div>
      {items.map((item, index) => (
        <button
          key={index}
          onClick={(e) => handleToggle(e, index)}
          className={value === index ? styles.active : ""}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Switcher;
