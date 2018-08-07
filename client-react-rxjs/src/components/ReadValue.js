import React from "react";
import DrizzleHelper from "../DrizzleHelper";

class ReadValue extends React.Component {
  state = { value: null };

  componentDidMount() {
    const { drizzle, drizzleState$ } = this.props;

    // 1. create an observable that streams our value from the store
    const { createCallObservable } = new DrizzleHelper(drizzle, drizzleState$);
    const value$ = createCallObservable("SimpleStorage", "storedData");

    // 2. whenever the value is updated, update component state
    this.mySub = value$.subscribe(value => this.setState({ value }));
  }

  componentWillUnmount() {
    this.mySub.unsubscribe();
  }

  render() {
    return <p>My stored value: {this.state.value}</p>;
  }
}

export default ReadValue;
