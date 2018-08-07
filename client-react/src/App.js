import React, { Component } from "react";
import "./App.css";
import DrizzleApp from "./DrizzleApp";

class App extends Component {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    // watch for changes in the store, update state when ready
    drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  render() {
    // wait till drizzle is ready before loading app
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div className="App">
        <DrizzleApp
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
      </div>
    );
  }
}

export default App;
