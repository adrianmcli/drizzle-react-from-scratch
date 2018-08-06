import React, { Component } from "react";
import { Observable, Subject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

class DrizzleApp extends Component {
  state = { inputValue: "", value: null, status: null };

  async componentDidMount() {
    const { drizzle } = this.props;
    const accounts = await drizzle.web3.eth.getAccounts();

    this.value$ = new Observable(observer => {
      const dataKey = drizzle.contracts.SimpleStorage.methods.storedData.cacheCall();
      drizzle.store.subscribe(() => {
        const drizzleState = drizzle.store.getState();
        const watchedData =
          drizzleState.contracts.SimpleStorage.storedData[dataKey];
        if (watchedData !== undefined) {
          observer.next(watchedData.value);
        }
      });
    });

    this.value$
      .pipe(distinctUntilChanged())
      .subscribe(x => this.setState({ value: x }));

    this.setValue$ = new Subject();

    this.tx$ = new Observable(observer => {
      this.setValue$.subscribe(x => {
        const { SimpleStorage } = drizzle.contracts;
        const stackId = SimpleStorage.methods.set.cacheSend(x, {
          from: accounts[0]
        });
        drizzle.store.subscribe(() => {
          const drizzleState = drizzle.store.getState();
          const txHash = drizzleState.transactionStack[stackId];
          if (txHash) {
            const status = drizzleState.transactions[txHash].status;
            observer.next(status);
          }
        });
      });
    });

    this.tx$
      .pipe(distinctUntilChanged())
      .subscribe(x => this.setState({ status: x }));
  }

  handleInputChange = e => this.setState({ inputValue: e.target.value });

  setValue = () => this.setValue$.next(this.state.inputValue);

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
