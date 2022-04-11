import { combineReducers } from "redux";

import { reducer } from ".";

const reducers = combineReducers({
  zeStates: reducer,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
