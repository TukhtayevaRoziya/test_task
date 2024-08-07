import { GET_PRODUCT } from './../actions/types';

const initialState = {
  data: []
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCT:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};

export default productReducer;