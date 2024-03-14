import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActiveTimeProvider } from "./context/activeTimeContext";
import { CartProvider } from "./context/cartContext";
import { ChatProvider } from "./context/chatContext";
import { instance } from "./http/instance";
import { getAccessToken } from "./redux/user/selectors";
import { getUserInfoThunk } from "./redux/user/operations";
import { getCategoriesThunk } from "./redux/category/operations";
import { getCoursesThunk } from "./redux/course/operations";
import {
  getCoursesInstuctionsThunk,
  getGeneralInstuctionsThunk,
} from "./redux/instruction/operations";
import useAdjustFontSize from "./hooks/useAdjustFontSize";
import useGoogleAuthentication from "./hooks/useGoogleAuthentication";
import Router from "./components/Router";

function App() {
  useGoogleAuthentication();
  const dispatch = useDispatch();
  const accessToken = useSelector(getAccessToken);

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

  // console.log(user);
  useAdjustFontSize();
  return (
    <ChatProvider>
      <CartProvider>
        <ActiveTimeProvider>
          <Router />
        </ActiveTimeProvider>
      </CartProvider>
    </ChatProvider>
  );
}

export default App;
