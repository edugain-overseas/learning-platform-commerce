import AdminRouter from "../components/Router/AdminRouter";
import StudentRouter from "../components/Router/StudentRouter";
import { ActiveTimeProvider } from "../context/activeTimeContext";
import { CartProvider } from "../context/cartContext";

export const getRouterByUserType = (userType) => {
  switch (userType) {
    case "student":
      return (
        <CartProvider>
          <ActiveTimeProvider>
            <StudentRouter />
          </ActiveTimeProvider>
        </CartProvider>
      );
    case "moder":
      return <AdminRouter />;

    default:
      return (
        <CartProvider>
          <ActiveTimeProvider>
            <StudentRouter />
          </ActiveTimeProvider>
        </CartProvider>
      );
  }
};
