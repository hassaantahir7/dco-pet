import React from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";

import "./index.css";
import App from "./app";
import { ContextProvider } from "./contexts/ContextProvider";
import { AuthProvider } from "./contexts/AuthProvider";

const root = createRoot(document.getElementById("root"));

root.render(
  <ReduxProvider store={store}>
    <ContextProvider>
      <App />
    </ContextProvider>
  </ReduxProvider>
);
