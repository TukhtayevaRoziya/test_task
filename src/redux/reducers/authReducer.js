import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_FAIL,
  GET_USER,
  MY_USER,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  data: null,
  users: [],
};

const authReducer = (state = initialState, action) => {
  const { type, payload, token } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        data: payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: token,
        isAuthenticated: true,
        loading: false,
        data: payload,
        // myData: action.myData,
      };
    case GET_USER:
      return {
        ...state,
        users: payload,
      };
    case MY_USER:
      return {
        ...state,
        myData: payload,
      };
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
