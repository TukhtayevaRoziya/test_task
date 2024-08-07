import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";

const appReducer = combineReducers({
  authReducer,
  productReducer
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;