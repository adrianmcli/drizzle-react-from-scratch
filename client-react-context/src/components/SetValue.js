import React from "react";

export default class SetValue extends React.Component {
  state = { stackId: null, inputValue: "" };

  handleInputChange = e => this.setState({ inputValue: e.target.value });

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

  getTxStatus = () => {
    const { stackId } = this.state;
    const { transactions, transactionStack } = this.props.drizzleState;

    // status is not yet tracked
    if (transactionStack[stackId] === undefined) return null;

    const txHash = transactionStack[stackId];
    return `Transaction status: ${transactions[txHash].status}`;
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />
        <button onClick={this.setValue}>Set Value</button>
        <div>{this.getTxStatus()}</div>
      </div>
    );
  }
}
