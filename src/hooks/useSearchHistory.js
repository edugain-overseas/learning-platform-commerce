import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAccessToken } from "../redux/user/selectors";
import { instance } from "../http/instance";
import useLocalStorage from "./useLocalStorage";

const HISTORY_MAX_LENGHT = 10;

export const useSearchHistory = () => {
  const accessToken = useSelector(getAccessToken);

  const [localHistory, setLocalHistory] = useLocalStorage("search-history", []);
  const [userHistory, setUserHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";

  useEffect(() => {
    const updateLocalHistory = () => {
      const validQuery = query.trim().toLowerCase();
      if (!validQuery) return;

      setLocalHistory((prevLocalHistory) => {
        if (prevLocalHistory[0]?.query === validQuery) {
          return prevLocalHistory;
        }
        const filtred = prevLocalHistory.filter(
          (item) => item.query !== validQuery
        );

        const updatedLocalHistory = [
          { query: validQuery, timestamp: new Date().toISOString() },
          ...filtred,
        ];
        return updatedLocalHistory.slice(0, HISTORY_MAX_LENGHT);
      });
    };

    if (query) updateLocalHistory();
  }, [query]);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      setIsLoading(true);
      try {
        const response = await instance.get("user/search/recent");
        if (response.data) {
          setUserHistory(response.data.recent_queries);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (accessToken) {
      fetchSearchHistory();
    }
  }, [accessToken]);

  const searchHistory = accessToken ? userHistory : localHistory;

  return { searchHistory, isLoading };
};
