import React, { useState } from "react";
import styles from "./HorizontalScroller.module.scss";

const HorizontalScroller = ({ children }) => {
  const [showBefore, setShowBefore] = useState(false);
  const [showAfter, setShowAfter] = useState(true);

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const scrollWidth = e.target.scrollWidth;
    const scrollerWidth = e.target.clientWidth;

    if (scrollLeft === 0) {
      setShowBefore(false);
      setShowAfter(true);
      return;
    }
    if (scrollLeft + scrollerWidth === scrollWidth) {
      setShowBefore(true);
      setShowAfter(false);
      return;
    }
    setShowBefore(true);
    setShowAfter(true);
  };
  return (
    <div
      className={`${styles.wrapper} ${showBefore ? styles.gradientLeft : ""} ${
        showAfter ? styles.gradientRight : ""
      }`}
    >
      {showBefore && <div className={styles.left}></div>}
      <div className={styles.content} onScroll={handleScroll}>
        {children}
      </div>
      {showAfter && <div className={styles.right}></div>}
    </div>
  );
};

export default HorizontalScroller;
