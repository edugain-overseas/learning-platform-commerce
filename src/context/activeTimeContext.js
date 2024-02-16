// ActiveTimeProvider.js
import React, { createContext, useContext, useEffect } from "react";
import useActiveTimeTracker from "../hooks/useActiveTimeTracker";

const ActiveTimeContext = createContext();

export const ActiveTimeProvider = ({ children }) => {
  const { activeTime, setActiveTime } = useActiveTimeTracker();

  useEffect(() => {
    const fetchActiveTime = async () => {
      try {
        // const response = await get("/api/active-time");
        const response = 0;
        setActiveTime(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchActiveTime();
    // eslint-disable-next-line
  }, []);

  return (
    <ActiveTimeContext.Provider value={activeTime}>
      {children}
    </ActiveTimeContext.Provider>
  );
};

export const useActiveTime = () => useContext(ActiveTimeContext);
