import React from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllInstructions } from "../../redux/instruction/selectors";
import { ReactComponent as DocSearchIcon } from "../../images/icons/document-search.svg";
import { getUserInfo } from "../../redux/user/selectors";
import InstructionItem from "./InstructionItem";
import AddInstruction from "./AddInstruction";
import EditInstruction from "./EditInstruction";
import DeleteIntruction from "./DeleteIntruction";
import styles from "./InstructionsList.module.scss";

const InstructionsList = () => {
  const { instructionId } = useParams();
  const { pathname } = useLocation();

  const instructions = useSelector(getAllInstructions);
  const generalInstruction = instructions.filter(
    ({ type }) => type === "general"
  );
  const coursesInstruction = instructions.filter(
    ({ type }) => type === "course"
  );

  const targetInstructions = pathname.includes("general")
    ? generalInstruction
    : coursesInstruction;

  const isAdmin = useSelector(getUserInfo).userType === "moder";

  return (
    <div className={styles.wrapper}>
      <ul className={styles.instructionsList}>
        {targetInstructions.map((instruction) => (
          <li className={styles.instructionItem} key={instruction.id}>
            <InstructionItem instruction={instruction} />
            {isAdmin && (
              <>
                <EditInstruction instructionId={instruction.id} />
                <DeleteIntruction instructionId={instruction.id} />
              </>
            )}
          </li>
        ))}
        {isAdmin && (
          <li className={styles.instructionItem}>
            <AddInstruction />
          </li>
        )}
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
