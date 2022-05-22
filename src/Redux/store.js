import { legacy_createStore, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./Reducers";

// initial states here
const initalState = {};

// middleware
const middleware = [thunk];

// creating store
export const store = legacy_createStore(
  rootReducer,
  initalState,
  // composeWithDevTools(applyMiddleware(...middleware))
);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);