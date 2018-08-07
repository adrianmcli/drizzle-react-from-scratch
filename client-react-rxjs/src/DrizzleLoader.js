import React from "react";
import { Observable } from "rxjs";

const createDrizzleState$ = drizzle =>
  new Observable(observer =>
    drizzle.store.subscribe(() => {
      const state = drizzle.store.getState();
      observer.next(state);
    })
  );

export default class DrizzleLoader extends React.Component {
  state = { loading: true };

  componentDidMount() {
    this.drizzleState$ = createDrizzleState$(this.props.drizzle);

    this.readySubscription = this.drizzleState$.subscribe(state => {
      // if drizzle is ready, set loading to false and unsubscribe
      if (state.drizzleStatus.initialized) {
        this.setState({ loading: false });
        this.readySubscription.unsubscribe();
      }
    });
  }

  componentWillUnmount() {
    this.readySubscription.unsubscribe();
  }

  render() {
    if (this.state.loading) {
      return this.props.renderLoading();
    }
    return this.props.render({ drizzleState$: this.drizzleState$ });
  }
}
