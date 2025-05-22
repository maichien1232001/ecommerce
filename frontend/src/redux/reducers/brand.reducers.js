import _ from "lodash";

const initialState = {
  brand: [],
  pagination: {},
  page: 1,
  limit: 10,
};

const brandReducers = (state = initialState, action) => {
  switch (action.type) {
    case "BRAND_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "BRAND_SUCCESS":
      return {
        ...state,
        loading: false,
        brand: _.get(action, "payload"),
      };
    case "BRAND_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default brandReducers;
