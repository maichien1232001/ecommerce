import _ from "lodash";

const initialState = {
  products: [],
  pagination: {},
  page: 1,
  limit: 10,
};

const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCTS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        products: _.get(action, "payload.products"),
        pagination: _.get(action, "payload.pagination"),
      };
    case "PRODUCTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "IMPORT_PRODUCTS_SUCCESS":
      return {
        ...state,
        products: _.get(action, "payload.data"),
      };
    case "ADD_PRODUCTS_SUCCESS":
      return {
        ...state,
        products: _.get(action, "payload.data"),
      };
    case "SET_PAGINATION":
      return {
        ...state,
        page: action.payload.page,
        limit: action.payload.limit,
      };
    default:
      return state;
  }
};

export default productReducers;
