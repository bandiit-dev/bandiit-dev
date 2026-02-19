import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./app/App";
import { LanguageProvider } from "./app/i18n";

import "./assets/global.css";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

if (
  import.meta.env.PROD &&
  typeof window !== "undefined" &&
  typeof document !== "undefined"
) {
  window.requestAnimationFrame(() => {
    document.dispatchEvent(new Event("bandiit-prerender-ready"));
  });
}
