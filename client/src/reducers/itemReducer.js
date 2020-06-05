import { v4 } from "uuid";
import * as actionTypes from "../actions/types";

const INITIAL_STATE = {
  items: [],
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_ITEMS:
      return { ...state, items: action.payload.items, loading: false };
    case actionTypes.ADD_ITEM:
      return { ...state, items: [action.payload.item, ...state.items] };
    case actionTypes.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload.id),
      };
    case actionTypes.ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
