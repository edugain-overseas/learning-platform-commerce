import React, { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../images/icons/search.svg";
import styles from "./MainSearchBar.module.scss";

const MainSearchBar = ({ wrapperClassName = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();

  const initialQuery =
    location.pathname === "/search" ? params.get("q") || "" : "";

  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (e) => {
    e?.preventDefault();

    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form
      className={`${styles.searchForm} ${wrapperClassName}`}
      onSubmit={handleSearch}
    >
      <div className={styles.inputWrapper}>
        <input
          type="search"
          placeholder="Search our courses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
      <button type="submit" className={styles.searchBtn}>
        <div>
          <SearchIcon />
        </div>
      </button>
    </form>
  );
};

export default MainSearchBar;
