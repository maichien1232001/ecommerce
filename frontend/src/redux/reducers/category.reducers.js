import _ from "lodash";

const initialState = {
  category: [],
  allCategory: [],
  loading: false,
  pagination: {},
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
        pagination: _.get(action, "payload.pagination"),
      };
    case "CATEGORIES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "GET_ALL_CATEGORIES_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ALL_CATEGORIES_SUCCESS":
      return {
        ...state,
        loading: false,
        allCategory: _.get(action, "payload.categories"),
      };
    case "GET_ALL_CATEGORIES_FAILURE":
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
        category: [_.get(action, "payload"), ...state.category],
        allCategory: [_.get(action, "payload"), ...state.allCategory],
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
      console.log("jjjj", action.payload);
      return {
        ...state,
        loading: false,
        category: state.category.map((category) =>
          category._id === action.payload._id ? action.payload : category
        ),

        allCategory: state.allCategory.map((category) =>
          category._id === action.payload._id ? action.payload : category
        ),
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
        category: state.category.filter(
          (category) => category._id !== action.payload
        ),
        allCategory: state.allCategory.filter(
          (category) => category._id !== action.payload
        ),
      };
    }
    case "DELETE_ITEM_CATEGORY_FAILURE": {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case "UPDATE_FILTER_CATEGORY":
      return {
        ...state,
        filter: {
          ...state.filter,
          page: action.payload.page,
          limit: action.payload.limit,
          name: _.get(action, "payload.name"),
        },
      };

    default:
      return state;
  }
};

export default categoryReducers;
