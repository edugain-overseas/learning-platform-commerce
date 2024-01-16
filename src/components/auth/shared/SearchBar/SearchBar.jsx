import React from "react";
import { ReactComponent as SearchIcon } from "../../../../images/icons/search.svg";
import { ReactComponent as CrossIcon } from "../../../../images/icons/cross.svg";
import styles from "./SearchBar.module.scss";

const SearchBar = ({
  width = "auto",
  value = "",
  onChange = () => {},
  clearBtn = false,
  placeholder = "Search...",
}) => {
  const handleInputChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };
  return (
    <div className={styles.wrapper}>
      <label>
        <SearchIcon className={styles.serchIcon} />
        <div className={styles.inputWrapper}>
          <input
            value={value}
            onChange={handleInputChange}
            style={{ width }}
            placeholder={placeholder}
          />
        </div>
      </label>
      {clearBtn && (
        <button onClick={() => onChange("")} className={styles.clearBtn}>
          <CrossIcon />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
