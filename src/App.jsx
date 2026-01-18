import { useSelector } from "react-redux";
import { getUserType } from "./redux/user/selectors";
import { getRouterByUserType } from "./utils/getRouterByUserType";
import { useInitialData } from "./hooks/useInitialData";
import useAdjustFontSize from "./hooks/useAdjustFontSize";
import useGoogleAuthentication from "./hooks/useGoogleAuthentication";
import { RouterProvider } from "react-router-dom";

function App() {
  useAdjustFontSize();
  useGoogleAuthentication();
  useInitialData();

  const userType = useSelector(getUserType);

  const router = getRouterByUserType(userType);

  return <RouterProvider router={router} />;
}

export default App;
