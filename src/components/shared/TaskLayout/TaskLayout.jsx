import React from "react";
import styles from "./TaskLayout.module.scss";

const ToolsContainer = ({ children }) => (
  <div className={styles.tools}>{children}</div>
);

const ContentContainer = ({ children }) => (
  <div className={styles.content}>{children}</div>
);

const Layout = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

const TaskLayout = {
  Container: Layout,
  Content: ContentContainer,
  Tools: ToolsContainer,
};

export default TaskLayout;
