import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// Setup Drizzle
import { Drizzle, generateStore } from "drizzle";
import SimpleStorage from "./contracts/SimpleStorage.json";

const options = { contracts: [SimpleStorage] };

const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(<App drizzle={drizzle} />, document.getElementById("root"));
registerServiceWorker();
