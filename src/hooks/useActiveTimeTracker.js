import { useState, useEffect } from "react";
import { updateStudingTime } from "../http/services/user";
import { useSelector } from "react-redux";
import { getAccessToken } from "../redux/user/selectors";

const useActiveTimeTracker = () => {
  const [activeTime, setActiveTime] = useState(0);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());
  const accessToken = useSelector(getAccessToken);
  
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
      if (accessToken) updateStudingTime(60000);
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
  }, [activeTime, accessToken]);

  return { activeTime, setActiveTime };
};

export default useActiveTimeTracker;
