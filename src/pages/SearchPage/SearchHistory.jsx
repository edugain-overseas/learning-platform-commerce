import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "../../images/icons/arrowDown.svg";
import styles from "./SearchPage.module.scss";

const SearchHistory = ({ history }) => {
  if (history?.length === 0) return null;

  return (
    <div className={styles.searchHistoryWrapper}>
      <h4 className={styles.title}>Search history</h4>
      <ul>
        {history.map((item) => (
          <li key={item.timestamp}>
            <Link
              to={`/search?q=${encodeURIComponent(item.query)}`}
              className={styles.historyLink}
            >
              <span>{item.query}</span>
              <ArrowIcon />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
