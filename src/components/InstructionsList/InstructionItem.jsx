import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as TaskIcon } from "../../images/icons/task.svg";
import { ReactComponent as CalendarIcon } from "../../images/icons/calendar.svg";
import { ReactComponent as ArrowDownIcon } from "../../images/icons/arrowDown.svg";
import InsetBtn from "../shared/InsetBtn/InsetBtn";
import styles from "./InstructionsList.module.scss";
import { navLinkActiveHandler } from "../../utils/navLinkActiveHandler";

const InstructionItem = ({ instruction }) => {
  console.log(instruction);
  return (
    <li className={styles.instructionItem}>
      <NavLink
        className={({ isActive }) => navLinkActiveHandler(isActive, styles)}
        to={`${instruction.instructionId}`}
      >
        <div className={styles.leftWrapper}>
          <TaskIcon />
          <h2>{instruction.name}</h2>
        </div>
        <div className={styles.rightWrapper}>
          <div className={styles.dateWrapper}>
            <CalendarIcon />
            <span className={styles.date}>
              Last update: {instruction.last_update}
            </span>
          </div>
          <InsetBtn icon={<ArrowDownIcon className={styles.chevronIcon} />} />
        </div>
      </NavLink>
    </li>
  );
};

export default InstructionItem;
