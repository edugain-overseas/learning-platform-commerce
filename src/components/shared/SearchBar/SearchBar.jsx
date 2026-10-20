import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    onChange(value);
  };

  const navigateToSearchWithQuery = (query) => {
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form
      className={styles.wrapper}
      onSubmit={(e) => {
        e.preventDefault();
        navigateToSearchWithQuery(value);
      }}
    >
      <label>
        <button type="submit" className={styles.searchButton}>
          <SearchIcon />
        </button>
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
          type="button"
          style={{
            opacity: value ? 1 : 0,
            pointerEvents: value ? "auto" : "none",
          }}
        >
          <CrossIcon />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
