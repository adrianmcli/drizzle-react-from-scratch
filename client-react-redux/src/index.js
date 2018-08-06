import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// custom setup for drizzle and redux + sagas

import { createStore, compose, applyMiddleware } from "redux";
import { generateContractsInitialState } from "drizzle";
import { DrizzleProvider } from "drizzle-react";
import createSagaMiddleware from "redux-saga";

import reducers from "./reducers";
import sagas from "./sagas";
import SimpleStorage from "./contracts/SimpleStorage.json";

const drizzleOptions = { contracts: [SimpleStorage] };
const initialState = {
  contracts: generateContractsInitialState(drizzleOptions)
};
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas);

ReactDOM.render(
  <DrizzleProvider options={drizzleOptions} store={store}>
    <App />
  </DrizzleProvider>,
  document.getElementById("root")
);
registerServiceWorker();
