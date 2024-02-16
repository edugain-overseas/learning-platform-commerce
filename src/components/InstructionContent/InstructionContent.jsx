import React from "react";
import { useParams } from "react-router-dom";
import { instructions } from "../../assets/courses";
import { ReactComponent as CategoryIcon } from "../../images/icons/category.svg";
import styles from "./InstructionContent.module.scss";
import DocumentLink from "../shared/DocumentLink/DocumentLink";

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
          {instruction.content.files.length > 0 && (
            <div className={styles.docsWrapper}>
              <h4>Download material</h4>
              <div className={styles.filesWrapper}>
                {instruction.content.files.map((file) => (
                  <DocumentLink key={file.id} file={file} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default InstructionContent;
