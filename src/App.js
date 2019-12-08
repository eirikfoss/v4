import React from "react";
import Router from "./router/Router";
import "./utils/main.scss";
import "bootstrap/dist/css/bootstrap.css";
import store from "./redux/store/index";
import { Provider } from "react-redux";

export default () => (
  <div className="root">
    <Provider store={store}>
      <Router />
    </Provider>
  </div>
);
