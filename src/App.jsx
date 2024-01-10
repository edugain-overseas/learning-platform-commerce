import Router from "./components/Router";
import { CartProvider } from "./context/cartContext";
import { ChatProvider } from "./context/chatContext";
import useAdjustFontSize from "./hooks/useAdjustFontSize";

function App() {
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
