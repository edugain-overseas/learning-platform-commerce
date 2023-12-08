import Router from "./components/Router";
import useAdjustFontSize from "./hooks/useAdjustFontSize";

function App() {
  useAdjustFontSize();
  return <Router />;
}

export default App;
