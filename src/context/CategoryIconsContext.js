import { createContext, useContext, useEffect, useState } from "react";
import { instance } from "../http/instance";
import { useSelector } from "react-redux";
import { getUserType } from "../redux/user/selectors";

const CategoryIconsContext = createContext({ icons: [] });

export const useCategoryIcons = () => useContext(CategoryIconsContext);

export const CategoryIconsProvider = ({ children }) => {
  const [icons, setIcons] = useState([]);
  const isModer = useSelector(getUserType) === "moder";

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await instance.get("/category-icons/");
        setIcons(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    isModer && fetchIcons();
  }, [isModer]);

  return (
    <CategoryIconsContext.Provider value={{ icons }}>
      {children}
    </CategoryIconsContext.Provider>
  );
};
