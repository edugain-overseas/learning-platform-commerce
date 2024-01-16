import { createContext, useContext, useState } from "react";

const CoursesListModeContext = createContext({});

export const useCoursesListMode = () => {
  return useContext(CoursesListModeContext);
};

export const CoursesListModeProvider = ({ children }) => {
  const [selectedListModeIndex, setSelecteListModeIndex] = useState(0);

  return (
    <CoursesListModeContext.Provider
      value={{ selectedListModeIndex, setSelecteListModeIndex }}
    >
      {children}
    </CoursesListModeContext.Provider>
  );
};
