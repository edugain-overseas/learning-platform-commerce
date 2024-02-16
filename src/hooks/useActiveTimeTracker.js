import { useState, useEffect } from "react";

const useActiveTimeTracker = () => {
  const [activeTime, setActiveTime] = useState(0);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setLastActiveTime(Date.now());
      } else {
        setActiveTime(activeTime + (Date.now() - lastActiveTime));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [activeTime, lastActiveTime]);


  

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        setActiveTime(activeTime + 60000);
      }
    }, 60000);

    const sendActiveTimeToServer = () => {
      // send to server
      console.log("to server:", activeTime);
    };

    const intervalSendToServer = setInterval(() => {
      if (document.visibilityState === "visible") {
        sendActiveTimeToServer();
      }
    }, 60000);

    return () => {
      clearInterval(interval);
      clearInterval(intervalSendToServer);
    };
  }, [activeTime]);

  return { activeTime, setActiveTime };
};

export default useActiveTimeTracker;
