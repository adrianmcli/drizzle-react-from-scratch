import React, { Component } from "react";
import { drizzleConnect } from "drizzle-react";
import "./App.css";

import DrizzleApp from "./DrizzleApp";

class MyApp extends Component {
  render() {
    const { drizzleStatus } = this.props;
    if (!drizzleStatus.initialized) return "Loading Drizzle...";
    return (
      <div className="App">
        <DrizzleApp />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus
  };
};

const App = drizzleConnect(MyApp, mapStateToProps);

export default App;
