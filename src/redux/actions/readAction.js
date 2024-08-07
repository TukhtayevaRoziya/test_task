import api from "../../utility/api";
import { GET_PRODUCT } from "./types";

export const getAction = (path, actionType) => async (dispatch) => {
  try {
    const res = await api.get(path);
    dispatch({
      type: actionType,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getProduct = () => async (dispatch) => {
  try {
    const res = await api.get("products");
    dispatch({
      type: GET_PRODUCT,
      payload: res.data.reverce(),
    });
  } catch (err) {
    console.log(err);
  }
};
