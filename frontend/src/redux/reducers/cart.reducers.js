import _ from "lodash";

const initialValues = {
  carts: [],
  totalPrice: 0,
  error: "",
};

const cartReducer = (state = initialValues, action) => {
  switch (action.type) {
    case "ADD_TO_CART_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ADD_TO_CART_SUCCESS":
      return {
        ...state,
        carts: action.payload.items,
        totalPrice: action.payload.totalPrice,
        loading: false,
      };
    case "ADD_TO_CART_FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "GET_CART_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_CART_SUCCESS":
      return {
        ...state,
        carts: action.payload.items,
        totalPrice: action.payload.totalPrice,
        loading: false,
      };
    case "GET_CART_FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "UPDATE_QUANTITY_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_QUANTITY_SUCCESS":
      return {
        ...state,
        carts: action.payload.items,
        totalPrice: action.payload.totalPrice,
        loading: false,
      };
    case "UPDATE_QUANTITY_FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "DELETE_CART_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "DELETE_CART_SUCCESS":
      return {
        ...state,
        carts: action.payload.items,
        totalPrice: action.payload.totalPrice,
        loading: false,
      };
    case "DELETE_CART_FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default cartReducer;
