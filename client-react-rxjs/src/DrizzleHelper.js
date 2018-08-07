import { Observable } from "rxjs";
import {
  distinctUntilChanged,
  withLatestFrom,
  filter,
  map,
  shareReplay
} from "rxjs/operators";

export default class DrizzleHelper {
  constructor(drizzle, drizzleState$) {
    this.drizzle = drizzle;
    this.drizzleState$ = drizzleState$;
  }

  createCallObservable = (contractName, methodName, ...args) => {
    const contract = this.drizzle.contracts[contractName];
    const dataKey = contract.methods[methodName].cacheCall(...args);

    const handler = observer =>
      this.drizzleState$
        .pipe(
          map(state => state.contracts[contractName][methodName][dataKey]),
          filter(data => data !== undefined),
          map(data => data.value),
          distinctUntilChanged()
        )
        .subscribe(value => observer.next(value));

    return new Observable(handler);
  };

  createSendObservable = (contractName, methodName, input$, txParams) => {
    const contract = this.drizzle.contracts[contractName];

    // convert inputs to stack ids, and make sure it can replay last value
    const stackId$ = input$.pipe(
      map(args => contract.methods[methodName].cacheSend(...args, txParams)),
      shareReplay(1),
      filter(x => x !== undefined)
    );

    // for every state change, check the status of our tx with the latest
    // stack id, if there is a change then update the observer
    const handler = observer =>
      this.drizzleState$
        .pipe(
          withLatestFrom(stackId$),
          map(([state, stackId]) => {
            const txHash = state.transactionStack[stackId];
            return state.transactions[txHash];
          }),
          filter(data => data !== undefined),
          map(data => data.status),
          distinctUntilChanged()
        )
        .subscribe(status => observer.next(status));

    return new Observable(handler);
  };
}
