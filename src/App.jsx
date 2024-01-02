import Router from "./components/Router";
import { CartProvider } from "./context/cartContext";
import useAdjustFontSize from "./hooks/useAdjustFontSize";

function App() {
  useAdjustFontSize();
  return (
    <CartProvider>
      <Router />
    </CartProvider>
  );
}

export default App;
