import _ from "lodash";

const initialState = {
  category: [],
  pagination: {},
  page: 1,
  limit: 10,
};

const categoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case "CATEGORIES_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "CATEGORIES_SUCCESS":
      return {
        ...state,
        loading: false,
        category: _.get(action, "payload.categories"),
      };
    case "CATEGORIES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducers;
