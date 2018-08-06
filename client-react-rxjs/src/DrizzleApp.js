import React, { Component } from "react";
import { Subject } from "rxjs";
import DrizzleObservableHelper from "./DrizzleObservableHelper";

class DrizzleApp extends Component {
  state = { inputValue: "", value: null, status: null };

  async componentDidMount() {
    const { drizzle } = this.props;
    const accounts = await drizzle.web3.eth.getAccounts();
    const txParams = { from: accounts[0] };

    // Instantiate class and helper functions
    const observableHelper = new DrizzleObservableHelper(drizzle);
    const { createCallObservable, createSendObservable } = observableHelper;

    // Create subject to track user's intention to set a new value
    this.setValue$ = new Subject();

    // Create an observable that watches for changes in the stored data
    const value$ = createCallObservable("SimpleStorage", "storedData");

    // Create an observable that tracks the tx status of calling the "set"
    // method with the input stream being the setValue$ created above
    const txStatus$ = createSendObservable(
      "SimpleStorage",
      "set",
      this.setValue$,
      txParams
    );

    // Subscribe to updates for the value and tx status
    this.sub1 = value$.subscribe(value => {
      console.log(value);
      this.setState({ value });
    });
    this.sub2 = txStatus$.subscribe(status => {
      console.log(status);
      this.setState({ status });
    });
  }

  componentWillUnmount() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

  handleInputChange = e => this.setState({ inputValue: e.target.value });

  // Note that we put the value in an array because the cacheSend call can
  // accept multiple arguments
  setValue = () => this.setValue$.next([this.state.inputValue]);

  render() {
    const { value, status } = this.state;
    if (value === null) return "Loading...";
    return (
      <div>
        <p>My stored value: {value}</p>
        <p>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
        </p>
        {status &&
          status !== "success" && <div>Transaction status: {status}</div>}
        <div>
          <button onClick={this.setValue}>Set Value</button>
        </div>
      </div>
    );
  }
}

export default DrizzleApp;
