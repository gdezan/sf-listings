import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

import LandingPage from "./pages/Landing";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <LandingPage />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
