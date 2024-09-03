import React from "react";
import Templates from "./Templates";
import SaveTemplate from "./SaveTemplate";
import styles from "./Template.module.scss";

const Template = ({ type, templateData }) => {
  return (
    <div className={styles.wrapper}>
      <Templates type={type} />
      <SaveTemplate type={type} templateData={templateData} />
    </div>
  );
};

export default Template;
