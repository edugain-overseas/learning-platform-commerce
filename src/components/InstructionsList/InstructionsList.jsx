import React from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
// import { instructions } from "../../assets/courses";
import { ReactComponent as DocSearchIcon } from "../../images/icons/document-search.svg";
import InstructionItem from "./InstructionItem";
import styles from "./InstructionsList.module.scss";
import { useSelector } from "react-redux";
import { getAllInstructions } from "../../redux/instruction/selectors";

const InstructionsList = () => {
  const { instructionId } = useParams();
  const { pathname } = useLocation();

  const instructions = useSelector(getAllInstructions);
  const generalInstruction = instructions.filter(
    ({ type }) => type === "general"
  );
  const coursesInstruction = instructions.filter(
    ({ type }) => type === "courses"
  );

  const targetInstructions = pathname.includes("general")
    ? generalInstruction
    : coursesInstruction;

  return (
    <div className={styles.wrapper}>
      <ul className={styles.instructionsList}>
        {targetInstructions.map((instruction) => (
          <InstructionItem key={instruction.id} instruction={instruction} />
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
