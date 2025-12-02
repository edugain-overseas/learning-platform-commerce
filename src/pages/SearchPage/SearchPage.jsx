import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { instance } from "../../http/instance";
import MainSearchBar from "../../components/SearchBar/MainSearchBar";
import SearchResults from "./SearchResults";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./SearchPage.module.scss";

const CACHE = new Map();

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const qFromUrl = searchParams.get("q")?.trim() || "";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debounceRef = useRef();

  useEffect(() => {
    if (!qFromUrl) {
      setData(null);
      return;
    }

    // cache
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

  return (
    <div className={styles.searchPage}>
      <div className={styles.header}>
        <MainSearchBar />
        {qFromUrl && (
          <h1>
            <span>Search results for:</span> "{qFromUrl}"
          </h1>
        )}
      </div>

      {loading && <Spinner />}
      {error && <p>{error}</p>}

      {data && <SearchResults data={data} />}
    </div>
  );
};

export default SearchPage;
