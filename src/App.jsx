import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActiveTimeProvider } from "./context/activeTimeContext";
import { CartProvider } from "./context/cartContext";
import { ChatProvider } from "./context/chatContext";
import { instance } from "./http/instance";
import { getAccessToken, getUserType } from "./redux/user/selectors";
import { getUserInfoThunk } from "./redux/user/operations";
import { getCategoriesThunk } from "./redux/category/operations";
import { getCoursesThunk } from "./redux/course/operations";
import {
  getCoursesInstuctionsThunk,
  getGeneralInstuctionsThunk,
} from "./redux/instruction/operations";
import useAdjustFontSize from "./hooks/useAdjustFontSize";
import useGoogleAuthentication from "./hooks/useGoogleAuthentication";
import Router from "./components/Router/StudentRouter";
import AdminRouter from "./components/Router/AdminRouter";

function App() {
  useGoogleAuthentication();
  const dispatch = useDispatch();
  const accessToken = useSelector(getAccessToken);
  const userType = useSelector(getUserType);

  useEffect(() => {
    if (accessToken) {
      instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
      dispatch(getUserInfoThunk());
      dispatch(getCoursesInstuctionsThunk());
    }
    dispatch(getCategoriesThunk());
    dispatch(getCoursesThunk());
    // eslint-disable-next-line
  }, [accessToken]);

  useEffect(() => {
    dispatch(getGeneralInstuctionsThunk());
    // eslint-disable-next-line
  }, []);

  useAdjustFontSize();
  return (
    <ChatProvider>
      {userType === "moder" ? (
        <AdminRouter />
      ) : (
        <CartProvider>
          <ActiveTimeProvider>
            <Router />
          </ActiveTimeProvider>
        </CartProvider>
      )}
    </ChatProvider>
  );
}

export default App;
