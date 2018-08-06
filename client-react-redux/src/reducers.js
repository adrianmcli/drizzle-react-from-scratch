import { combineReducers } from "redux";
import { drizzleReducers } from "drizzle";

const reducers = combineReducers({ ...drizzleReducers });

export default reducers;
