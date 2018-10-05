import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// 1. Import drizzle, drizzle-react, and your contract artifacts.
import { Drizzle, generateStore } from "drizzle";
import { DrizzleContext } from "drizzle-react";
import SimpleStorage from "./contracts/SimpleStorage.json";

// 2. Setup the drizzle instance.
const options = { contracts: [SimpleStorage] };
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

// 3. Wrap App with Context Provider
ReactDOM.render(
  <DrizzleContext.Provider drizzle={drizzle}>
    <App />
  </DrizzleContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
