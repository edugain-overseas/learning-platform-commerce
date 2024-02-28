import { useDispatch, useSelector } from "react-redux";
import Router from "./components/Router";
import { ActiveTimeProvider } from "./context/activeTimeContext";
import { CartProvider } from "./context/cartContext";
import { ChatProvider } from "./context/chatContext";
import useAdjustFontSize from "./hooks/useAdjustFontSize";
import useGoogleAuthentication from "./hooks/useGoogleAuthentication";
import { getAccessToken } from "./redux/user/selectors";
import { useEffect } from "react";
import { getUserInfoThunk } from "./redux/user/operations";
import { instance } from "./http/instance";

function App() {
  useGoogleAuthentication();
  const dispatch = useDispatch();
  const accessToken = useSelector(getAccessToken);

  useEffect(() => {
    if (accessToken) {
      instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
      dispatch(getUserInfoThunk());
    }
  // eslint-disable-next-line
  }, [accessToken]);

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
