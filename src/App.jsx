import { useSelector } from "react-redux";
import { ChatProvider } from "./context/chatContext";
import { getUserType } from "./redux/user/selectors";
import { getRouterByUserType } from "./utils/getRouterByUserType";
import useAdjustFontSize from "./hooks/useAdjustFontSize";
import useGoogleAuthentication from "./hooks/useGoogleAuthentication";
import { useInitialData } from "./hooks/useInitialData";

function App() {
  useGoogleAuthentication();
  useInitialData();
  useAdjustFontSize();

  const userType = useSelector(getUserType);

  return <ChatProvider>{getRouterByUserType(userType)}</ChatProvider>;
}

export default App;
