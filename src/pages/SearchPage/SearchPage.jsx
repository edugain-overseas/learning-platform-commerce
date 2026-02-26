import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { instance } from "../../http/instance";
import MainSearchBar from "../../components/SearchBar/MainSearchBar";
import SearchResults from "./SearchResults";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./SearchPage.module.scss";
import HomeCategories from "../HomePage/HomeCategories";
import SearchHistory from "./SearchHistory";
import HomeCourses from "../HomePage/HomeCourses";
import { useSearchHistory } from "../../hooks/useSearchHistory";

const CACHE = new Map();

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const qFromUrl = searchParams.get("q")?.trim() || "";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { searchHistory } = useSearchHistory();

  const debounceRef = useRef();

  useEffect(() => {
    if (!qFromUrl) {
      setData(null);
      return;
    }

    if (CACHE.has(qFromUrl)) {
      setData(CACHE.get(qFromUrl));
      return;
    }

    setLoading(true);
    setError(null);

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await instance.get(`/user/search?query=${qFromUrl}`);
        setData(res.data);
        CACHE.set(qFromUrl, res.data);
      } catch (e) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [qFromUrl]);

  console.log(data);

  const resultsAmount = data
    ? Object.keys(data).reduce((length, key) => (length += data[key].length), 0)
    : 0;

  return (
    <div className={styles.searchPage}>
      <div className={styles.header}>
        <h2>Search</h2>
        <div className={styles.searchbarWrapper}>
          <MainSearchBar />
        </div>
      </div>
      <div className={styles.content}>
        {qFromUrl ? (
          <>
            <div className={styles.resultsDiscription}>
              <h5 className={styles.title}>Search results for: {qFromUrl}</h5>
              <p>{resultsAmount} matches found</p>
            </div>
            {loading && <Spinner />}
            {error && <p className={styles.title}>{error}</p>}
            {data && <SearchResults data={data} />}
          </>
        ) : (
          <>
            <SearchHistory history={searchHistory} />
            <div className={styles.mostPopularContainer}>
              <HomeCategories />
              <HomeCourses />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
