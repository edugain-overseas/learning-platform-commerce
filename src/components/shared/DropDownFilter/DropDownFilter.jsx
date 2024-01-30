import React, { useEffect, useState } from "react";
import styles from "./DropDownFilter.module.scss";

const DropDownFilter = ({
  icon = null,
  width = "136rem",
  height = "28rem",
  label = "Filters",
  dropwownOptions = [],
  dropDownWidth = "140rem",
  dropDownMaxHeight = "200rem",
}) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest("#filter") || dropDownOpen) {
        setDropDownOpen(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
    // eslint-disable-next-line
  }, []);

  const handleWrapperClick = () => {
    setDropDownOpen((prev) => !prev);
  };
  return (
    <div className={styles.wrapper} style={{ width, height }} id="filter">
      <div className={styles.button} onClick={handleWrapperClick}>
        <span>{label}</span>
        {icon}
      </div>

      <div
        className={`${styles.dropdown} ${dropDownOpen ? styles.active : ""}`}
        style={{ width: dropDownWidth, maxHeight: dropDownMaxHeight }}
      >
        <ul>
          {dropwownOptions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropDownFilter;
