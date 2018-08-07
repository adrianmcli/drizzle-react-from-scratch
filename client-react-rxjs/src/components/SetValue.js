import React from "react";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import DrizzleHelper from "../DrizzleHelper";

class SetValue extends React.Component {
  state = { inputValue: "", status: null };

  handleInputChange = e => this.setState({ inputValue: e.target.value });

  async componentDidMount() {
    const { drizzle, drizzleState$ } = this.props;
    const accounts = await drizzle.web3.eth.getAccounts();

    // 1. create observable representing the value the user wants to set
    this.setValue$ = new Subject();

    // 2. create observable representing the tx status of our call to the "set"
    //    method with values from the setValue stream
    const { createSendObservable } = new DrizzleHelper(drizzle, drizzleState$);
    const txStatus$ = createSendObservable(
      "SimpleStorage",
      "set",
      this.setValue$.pipe(map(x => [x])), // values must be in an array
      { from: accounts[0] }
    );

    // 3. update local component state whenever tx status changes
    this.mySub = txStatus$.subscribe(status => this.setState({ status }));
  }

  componentWillUnmount() {
    this.mySub.unsubscribe();
  }

  render() {
    const { status, inputValue } = this.state;
    return (
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={this.handleInputChange}
        />
        <button onClick={() => this.setValue$.next(inputValue)}>
          Set Value
        </button>
        {status && <div>Transaction status: {status}</div>}
      </div>
    );
  }
}

export default SetValue;
