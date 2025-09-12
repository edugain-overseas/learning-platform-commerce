import React from "react";
import Templates from "./Templates";
import SaveTemplate from "./SaveTemplate";
import styles from "./Template.module.scss";

const Template = ({ type }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>Templates</span>
      <Templates type={type} />
      <SaveTemplate type={type} />
    </div>
  );
};

export default Template;
