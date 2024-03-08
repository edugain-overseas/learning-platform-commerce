import React from "react";
import styles from "./ChatsFilters.module.scss";
import { ReactComponent as CheckIcon } from "../../../images/icons/check.svg";
import InsetBtn from "../../shared/InsetBtn/InsetBtn";
import { useChats } from "../../../context/chatContext";

const ChatsFilters = () => {
  const { typeFilter, setTypeFilter } = useChats();

  const handleChangeFilter = (filter) => {
    if (filter === typeFilter) return;
    setTypeFilter(filter);
  };
  return (
    <ul className={styles.filtersList}>
      <li
        className={typeFilter === "all" ? styles.active : ""}
        onClick={() => handleChangeFilter("all")}
      >
        <InsetBtn icon={typeFilter === "all" ? <CheckIcon /> : null} />
        <span>All chats</span>
      </li>
      <li
        className={typeFilter === "active" ? styles.active : ""}
        onClick={() => handleChangeFilter("active")}
      >
        <InsetBtn icon={typeFilter === "active" ? <CheckIcon /> : null} />
        <span>Active chats</span>
      </li>
      <li
        className={typeFilter === "archive" ? styles.active : ""}
        onClick={() => handleChangeFilter("archive")}
      >
        <InsetBtn icon={typeFilter === "archive" ? <CheckIcon /> : null} />
        <span>Archive chats</span>
      </li>
    </ul>
  );
};

export default ChatsFilters;
