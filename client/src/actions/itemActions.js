import axios from "axios";
import * as actionTypes from "./types";

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios.get("/api/items").then((res) =>
    dispatch({
      type: actionTypes.GET_ITEMS,
      payload: res.data,
    })
  );
};

export const addItem = (item) => (dispatch) => {
  axios.post("/api/items", item).then((res) =>
    dispatch({
      type: actionTypes.ADD_ITEM,
      payload: res.data,
    })
  );
};

export const deleteItem = (id) => (dispatch) => {
  axios.delete(`/api/items/${id}`).then((res) =>
    dispatch({
      type: actionTypes.DELETE_ITEM,
      payload: {
        id,
      },
    })
  );
};

export const setItemsLoading = () => {
  return {
    type: actionTypes.ITEMS_LOADING,
  };
};
