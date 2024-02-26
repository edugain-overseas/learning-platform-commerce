import React, { createContext, useContext } from "react";
import useActiveTimeTracker from "../hooks/useActiveTimeTracker";

const ActiveTimeContext = createContext();

export const ActiveTimeProvider = ({ children }) => {
  const { activeTime } = useActiveTimeTracker();

  return (
    <ActiveTimeContext.Provider value={activeTime}>
      {children}
    </ActiveTimeContext.Provider>
  );
};

export const useActiveTime = () => useContext(ActiveTimeContext);
