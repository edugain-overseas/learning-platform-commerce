import React, { useState } from "react";
import InsetBtn from "../InsetBtn/InsetBtn";
import { ReactComponent as ChevronIcon } from "../../../images/icons/next.svg";
import styles from "./TaskLayout.module.scss";

const ToolsContainer = ({ children, title = "Content" }) => {
  const [isNarrowed, setIsNarrowed] = useState(true);
  return (
    <div
      className={styles.tools}
      id={`narrowed-${isNarrowed}`}
      data-narrowed={isNarrowed}
    >
      <div className={styles.toolsTitleContainer}>
        <span>{title}</span>
        <InsetBtn
          icon={<ChevronIcon className={styles.chevronIcon} />}
          onClick={() => setIsNarrowed(!isNarrowed)}
        />
      </div>
      <div className={styles.toolsContentContainer}>{children}</div>
    </div>
  );
};

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
