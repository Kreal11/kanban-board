import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
// import { Provider } from "react-redux";
// import { store } from "./redux/store.ts";

const rootElementId = "root";
const rootElement = document.getElementById(rootElementId);

if (!rootElement) {
  throw new Error(`Element with ${rootElementId} doesn't exist`);
}

//need to add basename="https://monkey-plant.onrender.com/ in BrowserRouter"

ReactDOM.createRoot(rootElement).render(
  <BrowserRouter basename="">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
