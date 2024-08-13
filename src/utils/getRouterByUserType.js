import AdminRouter from "../components/Router/AdminRouter";
import StudentRouter from "../components/Router/StudentRouter";
import { ActiveTimeProvider } from "../context/activeTimeContext";
import { CartProvider } from "../context/cartContext";
import { ChatProvider } from "../context/chatContext";

export const getRouterByUserType = (userType) => {
  switch (userType) {
    case "student":
      return (
        <ChatProvider>
          <CartProvider>
            <ActiveTimeProvider>
              <StudentRouter />
            </ActiveTimeProvider>
          </CartProvider>
        </ChatProvider>
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
