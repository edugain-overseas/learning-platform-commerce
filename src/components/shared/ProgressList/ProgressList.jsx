import React from "react";
import styles from "./ProgressList.module.scss";
import ProgressListItem from "./ProgressListItem";

const ProgressList = ({ items }) => {
  const sortedItemsByNumber = [...items].sort(
    (itemA, itemB) => itemA.number - itemB.number
  );

  console.log(sortedItemsByNumber);

  return (
    <ul className={styles.listWrapper}>
      {sortedItemsByNumber.map((item) => (
        <ProgressListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default ProgressList;
