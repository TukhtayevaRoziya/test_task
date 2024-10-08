import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";

import rootReducer from "./reducers/index";
import authToken from "../utility/authToken";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

window.store = store;

let currentState = store.getState();

store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();
  if (previousState.authReducer.token !== currentState.authReducer.token) {
    // const token = currentState.authReducer.token;
    const myData = currentState.authReducer.myData;
    authToken(myData);
  }
});

export default store;
