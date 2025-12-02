import React from "react";
import styles from "./SearchPage.module.scss";

const SearchResultBlock = ({ title, items, renderItem }) => {
  return (
    <section className={styles.resultBlock}>
      <h2>{title}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{renderItem(item)}</li>
        ))}
      </ul>
    </section>
  );
};

export default SearchResultBlock;
