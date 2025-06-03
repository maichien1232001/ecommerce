const initialState = {
  order: {},
  loading: false,
  orders: [],
  orderId: null,
  paginationState: {},
  pagination: {
    limit: 9,
    page: 1,
  },
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ORDER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ADD_ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case "ADD_ORDER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "UPDATE_ORDER_STATUS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_ORDER_STATUS_SUCCESS":
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case "UPDATE_ORDER_STATUS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "GET_ORDER_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ORDER_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        orders: action.payload.orders,
        paginationState: action.payload.pagination,
      };
    case "GET_ORDER_USER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "UPDATE_PAGINATION":
      return {
        ...state,
        pagination: {
          ...state.pagination,
          page: action.payload.page,
          limit: action.payload.limit,
        },
      };
    default:
      return state;
  }
};

export default orderReducer;
