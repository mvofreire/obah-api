import React from "react";
import ReactDOM from "react-dom";
import App from "./application";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import history from "./util/history";
import "./assets/main.less"

const root = document.getElementById("root");

const render = Component => {
  return ReactDOM.render(
    <Router history={history}>
      <Component />
    </Router>,
    root
  );
};

render(App);
serviceWorker.unregister();

if (module.hot) {
  module.hot.accept("./application", () => {
    const NextApp = require("./application").default;
    render(NextApp);
  });
}
