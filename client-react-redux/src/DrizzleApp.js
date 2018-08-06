import React from "react";
import { drizzleConnect } from "drizzle-react";

class DrizzleApp extends React.Component {
  constructor(props, context) {
    super();
    console.log(props);
    console.log("ctx", context);
  }
  state = { inputValue: "", dataKey: null };

  handleInputChange = e => this.setState({ inputValue: e.target.value });

  componentDidMount() {
    const { SimpleStorage } = this.props;
    console.log(this.props);
  }

  setValue = () => console.log(this.props);

  renderTxStatus = () => {
    const { drizzleState, stackId } = this.state;

    // status is not yet tracked
    if (!drizzleState || !drizzleState.transactionStack[stackId]) return null;

    const txHash = drizzleState.transactionStack[stackId];
    const status = drizzleState.transactions[txHash].status;

    // no need to display pending status if tx is done
    if (status === "success") return null;

    return <div>Transaction status: {status}</div>;
  };

  render() {
    const value = 0;
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

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    contracts: state.contracts,
    SimpleStorage: state.contracts.SimpleStorage,
    drizzleStatus: state.drizzleStatus
  };
};

const DrizzleAppContainer = drizzleConnect(DrizzleApp, mapStateToProps);

export default DrizzleAppContainer;
