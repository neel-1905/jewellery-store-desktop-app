import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </React.StrictMode>,
);
