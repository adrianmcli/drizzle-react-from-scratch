import React, { Component } from "react";
import "./App.css";
import DrizzleApp from "./DrizzleApp";

class App extends Component {
  state = { loading: true, intervalId: null };

  componentDidMount() {
    const { drizzle } = this.props;

    // every second, check if the drizzle store is ready
    const intervalId = setInterval(() => {
      const drizzleState = drizzle.store.getState();
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false }, this.clearInterval);
      }
    }, 1000);

    this.setState({ intervalId });
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  clearInterval = () => clearInterval(this.state.intervalId);

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div className="App">
        <DrizzleApp drizzle={this.props.drizzle} />
      </div>
    );
  }
}

export default App;
