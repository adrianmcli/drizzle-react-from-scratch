import React from "react";
import PropTypes from "prop-types";
import { drizzleConnect } from "drizzle-react";

class ReadValue extends React.Component {
  state = { dataKey: null };

  // using legacy context API to retrieve drizzle instance
  constructor(props, context) {
    super(props, context);
    const SimpleStorage = context.drizzle.contracts["SimpleStorage"];
    this.state.dataKey = SimpleStorage.methods["storedData"].cacheCall();
  }

  render() {
    const { SimpleStorage } = this.props;
    const storedData = SimpleStorage.storedData[this.state.dataKey];
    return <p>My stored value: {storedData && storedData.value}</p>;
  }
}

ReadValue.contextTypes = {
  drizzle: PropTypes.object
};

const mapStateToProps = state => ({
  SimpleStorage: state.contracts.SimpleStorage
});

const ReadValueContainer = drizzleConnect(ReadValue, mapStateToProps);

export default ReadValueContainer;
