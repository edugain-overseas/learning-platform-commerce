import React from "react";
import styles from "./ProgressList.module.scss";
import ProgressListItem from "./ProgressListItem";

const ProgressList = ({ items, blockedLessonMessage }) => {
  if (!Array.isArray(items)) return null;

  const sortedItemsByNumber = [...items].sort(
    (itemA, itemB) => itemA.number - itemB.number
  );

  return (
    <ul className={styles.listWrapper}>
      {sortedItemsByNumber.map((item) => (
        <ProgressListItem
          key={item.id}
          item={item}
          blockedLessonMessage={blockedLessonMessage}
        />
      ))}
    </ul>
  );
};

export default ProgressList;
