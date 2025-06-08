import _ from "lodash";

const initialState = {
  category: [],
  loading: false,
  filter: {
    page: 1,
    limit: 10,
    name: null,
  },
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
    case "CREATE_ITEM_CATEGORY_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "CREATE_ITEM_CATEGORY_SUCCESS": {
      return {
        ...state,
        loading: false,
        category: action.payload,
      };
    }
    case "CREATE_ITEM_CATEGORY_FAILURE": {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case "UPDATE_ITEM_CATEGORY_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "UPDATE_ITEM_CATEGORY_SUCCESS": {
      return {
        ...state,
        loading: false,
        category: action.payload,
      };
    }
    case "UPDATE_ITEM_CATEGORY_FAILURE": {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case "DELETE_ITEM_CATEGORY_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "DELETE_ITEM_CATEGORY_SUCCESS": {
      return {
        ...state,
        loading: false,
        category: action.payload,
      };
    }
    case "DELETE_ITEM_CATEGORY_FAILURE": {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default categoryReducers;
