import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import DrizzleContext from "./DrizzleContext";

ReactDOM.render(
  <DrizzleContext.Provider>
    <App />
  </DrizzleContext.Provider>,
  document.getElementById("root")
);
registerServiceWorker();
