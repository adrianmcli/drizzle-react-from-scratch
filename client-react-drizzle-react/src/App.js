import React, { Component } from "react";
import { DrizzleContext } from "drizzle-react";

import ReadValue from "./components/ReadValue";
import SetValue from "./components/SetValue";

import "./App.css";

class App extends Component {
  render() {
    return (
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return "Loading...";
          }

          return (
            <div className="App">
              <ReadValue drizzle={drizzle} drizzleState={drizzleState} />
              <SetValue drizzle={drizzle} drizzleState={drizzleState} />
            </div>
          );
        }}
      </DrizzleContext.Consumer>
    );
  }
}

export default App;
