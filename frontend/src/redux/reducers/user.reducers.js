const initialState = {
  user: {},
};
const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_PROFILE_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    case "UPDATE_PROFILE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "GET_USER_BY_ID_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_USER_BY_ID_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case "GET_USER_BY_ID_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "CHANGE_PASSWORD_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "CHANGE_PASSWORD_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    case "CHANGE_PASSWORD_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "DELETE_USER_PROFILE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "DELETE_USER_PROFILE_SUCCESS":
      return {
        ...state,
        loading: false,
        user: state.user.filter((user) => user.id !== action.payload),
      };
    case "DELETE_USER_PROFILE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "MANAGE_PAYMENT_INFO_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "MANAGE_PAYMENT_INFO_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case "MANAGE_PAYMENT_INFO_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "MANAGE_SHIPPING_ADDRESSES_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "MANAGE_SHIPPING_ADDRESSES_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case "MANAGE_SHIPPING_ADDRESSES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "GET_USER_PROFILE_REQUEST":
      return {
        ...state,
      };
    case "GET_USER_PROFILE_SUCCESS":
      console.log(action.payload);
      return {
        ...state,
        user: action.payload,
      };
    case "GET_USER_PROFILE_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default userReducers;
