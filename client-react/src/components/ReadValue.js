import React from "react";

export default class ReadValue extends React.Component {
  state = { dataKey: null };

  async componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.SimpleStorage;

    await window.ethereum.enable()

    const accounts = await drizzle.web3.eth.getAccounts();
    console.log(accounts)
    console.log(drizzle)
    console.log(drizzleState)

    // get and save the key for the variable we are interested in
    const dataKey = contract.methods["storedData"].cacheCall({ from: accounts[0] });
    this.setState({ dataKey });
  }

  render() {
    const { SimpleStorage } = this.props.drizzleState.contracts;
    const storedData = SimpleStorage.storedData[this.state.dataKey];
    return <p>My stored value: {storedData && storedData.value}</p>;
  }
}
