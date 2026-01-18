import { adminRouter } from "../components/Router/AdminRouter";
import { studentRouter } from "../components/Router/StudentRouter";

export const getRouterByUserType = (userType) => {
  switch (userType) {
    case "student":
      return studentRouter;
    case "moder":
      return adminRouter;
    default:
      return studentRouter;
  }
};
