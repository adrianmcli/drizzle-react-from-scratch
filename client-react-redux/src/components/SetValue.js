import React from "react";
import PropTypes from "prop-types";
import { drizzleConnect } from "drizzle-react";

class SetValue extends React.Component {
  state = { inputValue: "", stackId: null };

  // using legacy context API to retrieve drizzle instance
  constructor(props, context) {
    super(props, context);
    this.contract = context.drizzle.contracts["SimpleStorage"];
  }

  handleInputChange = e => this.setState({ inputValue: e.target.value });

  setValue = () => {
    const { inputValue } = this.state;
    const { accounts } = this.props;

    const stackId = this.contract.methods["set"].cacheSend(inputValue, {
      from: accounts[0]
    });

    this.setState({ stackId });
  };

  getTxStatus = () => {
    const { stackId } = this.state;
    const { transactions, transactionStack } = this.props;

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

SetValue.contextTypes = {
  drizzle: PropTypes.object
};

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    transactions: state.transactions,
    transactionStack: state.transactionStack
  };
};

const SetValueContainer = drizzleConnect(SetValue, mapStateToProps);

export default SetValueContainer;
