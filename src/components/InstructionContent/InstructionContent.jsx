import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllCategories } from "../../redux/category/selectors";
import { getAllInstructions } from "../../redux/instruction/selectors";
import { ReactComponent as CategoryIcon } from "../../images/icons/category.svg";
import DocumentLink from "../shared/DocumentLink/DocumentLink";
import styles from "./InstructionContent.module.scss";

const InstructionContent = () => {
  const { instructionId: id } = useParams();
  const instructions = useSelector(getAllInstructions);

  const instruction = instructions.find(
    ({ id: instructionId }) => instructionId === +id
  );

  const category = useSelector(getAllCategories).find(
    ({ id }) => id === instruction?.category_id
  );

  return (
    <div className={styles.wrapper}>
      {instruction ? (
        <div className={styles.contentWrapper}>
          <div className={styles.header}>
            <h3>{instruction?.title}</h3>
            <div className={styles.categoryWrapper}>
              <CategoryIcon />
              <h4>Category:{` ${category ? category.title : "general"}`}</h4>
            </div>
          </div>
          <div
            className={styles.textBlock}
            dangerouslySetInnerHTML={{ __html: instruction.text }}
          ></div>
          {instruction?.files?.length > 0 && (
            <div className={styles.docsWrapper}>
              <h4>Download material</h4>
              <div className={styles.filesWrapper}>
                {instruction?.files.map((file, index) => (
                  <DocumentLink key={index} file={file} />
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
