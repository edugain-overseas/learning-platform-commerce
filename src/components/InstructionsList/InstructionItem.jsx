import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { navLinkActiveHandler } from "../../utils/navLinkActiveHandler";
import { ReactComponent as TaskIcon } from "../../images/icons/task.svg";
import { ReactComponent as CalendarIcon } from "../../images/icons/calendar.svg";
import { ReactComponent as ArrowDownIcon } from "../../images/icons/arrowDown.svg";
import { getFormattedStrFromDate } from "../../utils/formatDate";
import InsetBtn from "../shared/InsetBtn/InsetBtn";
import styles from "./InstructionsList.module.scss";

const InstructionItem = ({ instruction }) => {
  const { pathname } = useLocation();
  const params = useParams();

  const isActiveInstruction = instruction.id === +params.instructionId;
  const closedLink = pathname.replace(`/${params.instructionId}`, "");

  return (
    <>
      <NavLink
        className={({ isActive }) => navLinkActiveHandler(isActive, styles)}
        to={isActiveInstruction ? closedLink : `${instruction.id}`}
      >
        <div className={styles.leftWrapper}>
          <TaskIcon />
          <h2>{instruction.name}</h2>
        </div>
        <div className={styles.rightWrapper}>
          <div className={styles.dateWrapper}>
            <CalendarIcon />
            <span className={styles.date}>
              Last update: {getFormattedStrFromDate(instruction.last_update)}
            </span>
          </div>
          <InsetBtn icon={<ArrowDownIcon className={styles.chevronIcon} />} />
        </div>
      </NavLink>
    </>
  );
};

export default InstructionItem;
