import Router from "./components/Router";
import { CartProvider } from "./context/cartContext";
import { ChatProvider } from "./context/chatContext";
import useAdjustFontSize from "./hooks/useAdjustFontSize";
import useGoogleAuthentication from "./hooks/useGoogleAuthentication";

function App() {
  const user = useGoogleAuthentication();
  console.log(user);
  useAdjustFontSize();
  return (
    <ChatProvider>
      <CartProvider>
        <Router />
      </CartProvider>
    </ChatProvider>
  );
}

export default App;
