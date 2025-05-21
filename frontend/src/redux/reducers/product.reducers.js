import _ from "lodash";

const initialState = {
  products: [],
  product: {},
  pagination: {},
  filter: {
    page: 1,
    limit: 10,
    name: "",
    priceMin: "",
    priceMax: "",
    createdFrom: "",
    createdTo: "",
    updatedFrom: "",
    updatedTo: "",
    inStock: "",
    category: "",
    isFeatured: "",
    status: "",
    brand: "",
  },
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
        products: [...state.products, ..._.get(action, "payload.data", [])],
      };
    case "VIEW_PRODUCTS_SUCCESS":
      return {
        ...state,
        product: _.get(action, "payload.product"),
      };
    case "EDIT_PRODUCTS_SUCCESS":
      console.log(action.payload);
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };

    case "DELETE_PRODUCTS_SUCCESS":
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };

    case "UPDATE_FILTER":
      return {
        ...state,
        filter: {
          ...state.filter,
          page: action.payload.page,
          limit: action.payload.limit,
          name: _.get(action, "payload.name"),
          priceMin: _.get(action, "payload.priceMin"),
          priceMax: _.get(action, "payload.priceMax"),
          createdFrom: _.get(action, "payload.createdFrom"),
          createdTo: _.get(action, "payload.createdTo"),
          updatedFrom: _.get(action, "payload.updatedFrom"),
          updatedTo: _.get(action, "payload.updatedTo"),
          inStock: _.get(action, "payload.inStock"),
          category: _.get(action, "payload.category"),
          isFeatured: _.get(action, "payload.isFeatured"),
          status: _.get(action, "payload.status"),
          brand: _.get(action, "payload.brand"),
        },
      };

    default:
      return state;
  }
};

export default productReducers;
