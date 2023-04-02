import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import NotificationReducer from "./reducers/NotificationReducer";
import store from "./reducers/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
