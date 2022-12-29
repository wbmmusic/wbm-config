import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { HashRouter } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  </HashRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
