import React from "react";
import { useParams } from "react-router-dom";
import { instructions } from "../../assets/courses";
import { ReactComponent as CategoryIcon } from "../../images/icons/category.svg";
import styles from "./InstructionContent.module.scss";

const InstructionContent = () => {
  const { instructionId: id } = useParams();

  const instruction = instructions.find(
    ({ instructionId }) => instructionId === +id
  );
  return (
    <div className={styles.wrapper}>
      {instruction ? (
        <div className={styles.contentWrapper}>
          <div className={styles.header}>
            <h3>{instruction.title}</h3>
            <div className={styles.categoryWrapper}>
              <CategoryIcon />
              <h4>Category:{` ${instruction.category}`}</h4>
            </div>
          </div>
          <div
            className={styles.textBlock}
            dangerouslySetInnerHTML={{ __html: instruction.content.text }}
          ></div>
          <div className={styles.docsWrapper}></div>
        </div>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default InstructionContent;
