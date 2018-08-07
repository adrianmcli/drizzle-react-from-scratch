import React, { Component } from "react";
import "./App.css";

import DrizzleContext from "./DrizzleContext";

import ReadValue from "./components/ReadValue";
import SetValue from "./components/SetValue";

const App = () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, loading } = drizzleContext;

      if (loading) {
        return <h1>Loading...</h1>;
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

export default App;
