const initialState = {
  wishlist: [],
  loading: false,
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_WISH_LIST_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_WISH_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        wishlist: action.payload,
      };
    case "GET_WISH_LIST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "ADD_TO_WISH_LIST_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ADD_TO_WISH_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        wishlist: action.payload.wishlist,
      };
    case "ADD_TO_WISH_LIST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "REMOVE_WISH_LIST_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "REMOVE_WISH_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        wishlist: action.payload.wishlist,
      };
    case "REMOVE_WISH_LIST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default wishlistReducer;
