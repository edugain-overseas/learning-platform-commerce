import React from "react";
import { ReactComponent as SearchIcon } from "../../../images/icons/search.svg";
import { ReactComponent as CrossIcon } from "../../../images/icons/cross.svg";
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
        <button
          onClick={() => onChange("")}
          className={styles.clearBtn}
          style={{
            opacity: value ? 1 : 0,
            pointerEvents: value ? "auto" : "none",
          }}
        >
          <CrossIcon />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
