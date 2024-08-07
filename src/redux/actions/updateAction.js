import api from "../../utility/api";
import { getAction } from "./readAction";
import { GET_PRODUCT } from "./types";

export const updateAction =
  (path, actionType, id, data) => async (dispatch) => {
    try {
      const res = await api.put(`${path}/${id}`, data);

      dispatch({
        type: actionType,
        payload: res.data,
      });
        dispatch(getAction("products", GET_PRODUCT));
    
    } catch (err) {
      console.log(err);
    }
  };