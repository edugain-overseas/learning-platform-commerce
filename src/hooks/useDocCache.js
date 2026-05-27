import useLocalStorage from "./useLocalStorage";

export const useDocCache = () => {
  const [cache, setCache] = useLocalStorage("app_google_docs_cache", {});

  const saveToCache = (url, type, responseData) => {
    let title = "Untitled Document";
    if (type === "lecture" && responseData.lectures?.[0]) {
      title = responseData.lectures[0].lesson_title;
    } else if (type === "test" && responseData.tests?.[0]) {
      title = responseData.tests[0].title;
    }

    const cacheKey = `${type}_${url}`;

    setCache((prevCache) => ({
      ...prevCache,
      [cacheKey]: {
        url,
        type, // 'lecture' | 'test'
        title,
        response: responseData,
        savedAt: new Date().toISOString(),
      },
    }));
  };

  const removeFromCache = (url, type) => {
    const cacheKey = `${type}_${url}`;
    setCache((prevCache) => {
      const updatedCache = { ...prevCache };
      delete updatedCache[cacheKey];
      return updatedCache;
    });
  };

  const clearAllCache = () => {
    setCache({});
  };

  return {
    cache,
    saveToCache,
    removeFromCache,
    clearAllCache,

    getCachedDoc: (url, currentType) => {
      const cacheKey = `${currentType}_${url}`;
      return cache?.[cacheKey]?.response || null;
    },

    getCacheListByType: (currentType) => {
      if (!cache) return [];
      return Object.values(cache).filter((item) => item.type === currentType);
    },
  };
};
