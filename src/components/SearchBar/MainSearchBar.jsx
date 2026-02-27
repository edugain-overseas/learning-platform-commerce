import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { instance } from "../../http/instance";
import { ReactComponent as SearchIcon } from "../../images/icons/search.svg";
import styles from "./MainSearchBar.module.scss";

const SUGGESTIONS_CACHE = new Map();

const MainSearchBar = ({ wrapperClassName = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();

  const initialQuery =
    location.pathname === "/search" ? params.get("q") || "" : "";

  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef();

  const navigateToSearchWithQuery = (query) => {
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    navigateToSearchWithQuery(query);
  };

  // handle get suggestions for query from search-intup
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (SUGGESTIONS_CACHE.has(query)) {
      setSuggestions(SUGGESTIONS_CACHE.get(query));
      if (query !== initialQuery) setShowSuggestions(true);
      return;
    }

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const response = await instance.get(
          `/user/search/suggestion?query=${query}`
        );

        if (response.data) {
          const suggestionsArray = [];
          Object.entries(response.data).forEach(([key, arrayOfValues]) =>
            arrayOfValues.forEach((value) =>
              suggestionsArray.push({ type: key, value })
            )
          );
          SUGGESTIONS_CACHE.set(query, suggestionsArray);
          setSuggestions(suggestionsArray);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (query !== initialQuery) setShowSuggestions(true);
      }
    }, 300);
    // eslint-disable-next-line
  }, [query]);

  console.log(suggestions);

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
          onFocus={() => suggestions.length && setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
        />

        <div
          className={styles.suggestionsContainer}
          style={{
            opacity: showSuggestions ? 1 : 0,
            height: showSuggestions ? "auto" : 0,
            pointerEvents: showSuggestions ? "auto" : "none",
          }}
        >
          {suggestions.length ? (
            <ul className={styles.suggestionsList}>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onMouseDown={() =>
                    navigateToSearchWithQuery(suggestion.value)
                  }
                >
                  <h5>{suggestion.value}</h5>
                  <span>{suggestion.type}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No results</p>
          )}
        </div>
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
