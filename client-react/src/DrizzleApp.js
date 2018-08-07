import React, { Component } from "react";

class DrizzleApp extends Component {
  state = { dataKey: null, stackId: null, inputValue: "" };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.SimpleStorage;

    // get and save the key for the variable we are interested in
    const dataKey = contract.methods["storedData"].cacheCall();
    this.setState({ dataKey });
  }

  setValue = async () => {
    const { drizzle } = this.props;
    const accounts = await drizzle.web3.eth.getAccounts();
    const contract = drizzle.contracts.SimpleStorage;

    // call the "set" method with the inputValue
    // we get a stack id as a reference to the transaction
    const stackId = contract.methods["set"].cacheSend(this.state.inputValue, {
      from: accounts[0]
    });

    this.setState({ stackId });
  };

  renderTxStatus = () => {
    const { drizzleState } = this.props;
    const { stackId } = this.state;

    // status is not yet tracked
    if (!drizzleState.transactionStack[stackId]) return null;

    const txHash = drizzleState.transactionStack[stackId];
    const status = drizzleState.transactions[txHash].status;

    // no need to display pending status if tx is done
    if (status === "success") return null;

    return <div>Transaction status: {status}</div>;
  };

  render() {
    const { dataKey } = this.state;
    const { drizzleState } = this.props;
    const contract = drizzleState.contracts.SimpleStorage;

    if (!contract.storedData[dataKey]) return "waiting for subscription...";
    return (
      <div>
        <p>My stored value: {contract.storedData[dataKey].value}</p>
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
