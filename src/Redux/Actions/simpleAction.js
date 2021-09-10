import axios from "axios";
import {
  GET_USERRS,
  USERS_ERROR,
  GET_ITEMS,
  GET_USERRS_WITH,
  GET_LOADING,
} from "./types";

export const simpleAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LOADING });
    const res = await axios.all([
      axios.get(`https://swapi.dev/api/people/1`),
      axios.get(`https://swapi.dev/api/people/2`),
    ]);
    const [req1, req2] = res;
    
    dispatch({
      type: GET_USERRS,
      payload: [req1.data, req2.data],
    });
  } catch (e) {
   
    dispatch({
      type: USERS_ERROR,
      payload: e,
    });
  }
};

export const getItems = () => (dispatch) => {
  const result = [
    "carrot",
    "apple",
    "grapes",
    "cake",
    "crackers",
    "chips",
    "tv",
    "ham",
    "beef",
  ];
  dispatch({
    type: GET_ITEMS,
    payload: result,
  });
};

export const ageDemographic = (item) => async (dispatch) => {
  try {
    dispatch({ type: GET_LOADING });
    const movieUrl = item.split(",").map((i) => axios.get(i));
    const res = await axios.all(movieUrl);

    dispatch({
      type: GET_USERRS_WITH,
      payload: res,
    });
  } catch (e) {
    dispatch({
      type: USERS_ERROR,
      payload: e,
    });
  }
};
