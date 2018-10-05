import React from "react";

export default class ReadValue extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.SimpleStorage;

    // get and save the key for the variable we are interested in
    const dataKey = contract.methods["storedData"].cacheCall();
    this.setState({ dataKey });
  }

  render() {
    const { SimpleStorage } = this.props.drizzleState.contracts;
    const storedData = SimpleStorage.storedData[this.state.dataKey];
    return <p>My stored value: {storedData && storedData.value}</p>;
  }
}
