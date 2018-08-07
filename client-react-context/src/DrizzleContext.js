import React from "react";
import { Drizzle, generateStore } from "drizzle";
import SimpleStorage from "./contracts/SimpleStorage.json";

// setup drizzle
const options = { contracts: [SimpleStorage] };
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

// setup context
const Context = React.createContext();

class Provider extends React.Component {
  state = { drizzleState: null, loading: true };

  componentDidMount() {
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
    return (
      <Context.Provider
        value={{
          drizzle,
          drizzleState: this.state.drizzleState,
          loading: this.state.loading
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default {
  Consumer: Context.Consumer,
  Provider
};
