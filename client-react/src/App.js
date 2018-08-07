import React, { Component } from "react";
import "./App.css";

import ReadValue from "./components/ReadValue";
import SetValue from "./components/SetValue";

class App extends Component {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store, keep state up-to-date
    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    // wait for drizzle to be initialized before showing app
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div className="App">
        <ReadValue
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <SetValue
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
      </div>
    );
  }
}

export default App;
