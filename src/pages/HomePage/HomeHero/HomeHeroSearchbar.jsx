import { useState } from "react";
import { ReactComponent as SearchIcon } from "../../../images/icons/search.svg";
import styles from "../HomePage.module.scss";

const HomeHeroSearchbar = () => {
  const [query, setQuery] = useState("");
  return (
    <div className={styles.heroSearchbar}>
      <div className={styles.inputWrapper}>
        <input
          type="search"
          placeholder="Search our courses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button className={styles.searchBtn}>
        <div>
          <SearchIcon />
        </div>
      </button>
    </div>
  );
};

export default HomeHeroSearchbar;
