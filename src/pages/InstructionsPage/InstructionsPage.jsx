import React from "react";
import styles from "./InstructionsPage.module.scss";
import InstructionsPanel from "../../components/InstructionsPanel/InstructionsPanel";
import { Outlet } from "react-router-dom";

const InstructionsPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <InstructionsPanel />
      <div className={styles.contentWrapper}>
        <Outlet />
      </div>
    </div>
  );
};

export default InstructionsPage;
