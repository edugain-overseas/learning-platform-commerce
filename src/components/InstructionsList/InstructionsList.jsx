import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { instructions } from "../../assets/courses";
import { ReactComponent as DocSearchIcon } from "../../images/icons/document-search.svg";
import InstructionItem from "./InstructionItem";
import styles from "./InstructionsList.module.scss";

const InstructionsList = () => {
  const { instructionId } = useParams();
  return (
    <div className={styles.wrapper}>
      <ul className={styles.instructionsList}>
        {instructions.map((instruction) => (
          <InstructionItem
            key={instruction.instructionId}
            instruction={instruction}
          />
        ))}
      </ul>
      <div className={styles.instructionContentWrapper}>
        {instructionId ? (
          <Outlet />
        ) : (
          <div className={styles.fallback}>
            <DocSearchIcon />
            <span>instruction</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructionsList;
