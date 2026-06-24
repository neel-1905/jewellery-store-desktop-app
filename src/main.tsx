import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";

document.addEventListener("keydown", (e) => {
  if (
    e.key === "F5" ||
    (e.ctrlKey && e.key === "r") ||
    (e.metaKey && e.key === "r") ||
    (e.ctrlKey && e.shiftKey && e.key === "R") ||
    (e.metaKey && e.shiftKey && e.key === "R")
  ) {
    e.preventDefault();
  }
});

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </React.StrictMode>,
);
