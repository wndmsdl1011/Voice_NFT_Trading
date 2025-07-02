import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";

const container = document.getElementById("root");
const root = createRoot(container, {
  onUncaughtError: (error, errorInfo) => {
    console.error("Uncaught error:", error, errorInfo);
  },
  onCaughtError: (error, errorInfo) => {
    console.error("Caught error:", error, errorInfo);
  },
  onRecoverableError: (error, errorInfo) => {
    console.warn("Recoverable error:", error, errorInfo);
  },
});

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
