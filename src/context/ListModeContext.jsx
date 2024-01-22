import { createContext, useContext, useState } from "react";

const ListModeContext = createContext({});

export const useListMode = () => {
  return useContext(ListModeContext);
};

export const ListModeProvider = ({ children }) => {
  const [selectedListModeIndex, setSelecteListModeIndex] = useState(0);

  return (
    <ListModeContext.Provider
      value={{ selectedListModeIndex, setSelecteListModeIndex }}
    >
      {children}
    </ListModeContext.Provider>
  );
};
