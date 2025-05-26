const initialState = {
  provinces: [],
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROVINCES_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_PROVINCES_SUCCESS":
      return {
        ...state,
        loading: false,
        provinces: action.payload,
      };
    case "GET_PROVINCES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default addressReducer;
