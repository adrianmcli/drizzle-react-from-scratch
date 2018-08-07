import React from "react";
import { drizzleConnect } from "drizzle-react";
import "./App.css";

import ReadValue from "./components/ReadValue";
import SetValue from "./components/SetValue";

const App = ({ drizzleStatus }) => {
  // wait for drizzle to be initialized before showing app
  if (!drizzleStatus.initialized) {
    return "Loading Drizzle...";
  }
  return (
    <div className="App">
      <ReadValue />
      <SetValue />
    </div>
  );
};

const mapStateToProps = state => ({ drizzleStatus: state.drizzleStatus });

const AppContainer = drizzleConnect(App, mapStateToProps);

export default AppContainer;
