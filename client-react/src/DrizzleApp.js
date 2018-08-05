import React, { Component } from "react";

class DrizzleApp extends Component {
  state = { drizzleState: null, dataKey: null, stackId: null, inputValue: "" };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  componentDidMount() {
    const { drizzle } = this.props;

    // watch for state changes
    drizzle.store.subscribe((a, b) => {
      const drizzleState = drizzle.store.getState();
      this.setState({ drizzleState });
    });

    // get and save the key for the variable we are interested in
    const dataKey = drizzle.contracts.SimpleStorage.methods.storedData.cacheCall();
    this.setState({ dataKey });
  }

  setValue = async () => {
    const { drizzle } = this.props;
    const accounts = await drizzle.web3.eth.getAccounts();
    // Declare this transaction to be observed. We'll receive the stackId for reference.
    const stackId = drizzle.contracts.SimpleStorage.methods.set.cacheSend(
      this.state.inputValue,
      {
        from: accounts[0]
      }
    );

    this.setState({ stackId });
  };

  renderTxStatus = () => {
    const { drizzleState, stackId } = this.state;

    // status is not yet tracked
    if (!drizzleState.transactionStack[stackId]) return null;

    const txHash = drizzleState.transactionStack[stackId];
    const status = drizzleState.transactions[txHash].status;

    // no need to display pending status if tx is done
    if (status === "success") return null;

    return <div>Transaction status: {status}</div>;
  };

  render() {
    const { drizzleState, dataKey } = this.state;
    if (!drizzleState) return "loading drizzle state...";
    if (!drizzleState.contracts.SimpleStorage.storedData[dataKey])
      return "waiting for subscription...";
    const value =
      drizzleState.contracts.SimpleStorage.storedData[dataKey].value;
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
        {this.renderTxStatus()}
        <div>
          <button onClick={this.setValue}>Set Value</button>
        </div>
      </div>
    );
  }
}

export default DrizzleApp;
