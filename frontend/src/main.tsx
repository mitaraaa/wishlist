import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "@/app";
import DragAndDropProvider from "@/contexts/drag-and-drop-context";
import store from "@/redux/store";

import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <DragAndDropProvider>
        <App />
      </DragAndDropProvider>
    </Provider>
  </React.StrictMode>,
);
