import { createContext, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { getAccessToken } from "../redux/user/selectors";
import NotificationDrawer from "../components/NotificationDrawer/NotificationDrawer";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

const NotificatonProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = [];
  const accessToken = useSelector(getAccessToken);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        isOpen,
      }}
    >
      {children}
      {accessToken && <NotificationDrawer />}
    </NotificationContext.Provider>
  );
};

export default NotificatonProvider;
