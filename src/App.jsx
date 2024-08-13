import { useSelector } from "react-redux";
import { getUserType } from "./redux/user/selectors";
import { getRouterByUserType } from "./utils/getRouterByUserType";
import { useInitialData } from "./hooks/useInitialData";
import useAdjustFontSize from "./hooks/useAdjustFontSize";
import useGoogleAuthentication from "./hooks/useGoogleAuthentication";

function App() {
  useGoogleAuthentication();
  useInitialData();
  useAdjustFontSize();

  const userType = useSelector(getUserType);

  return getRouterByUserType(userType);
}

export default App;
