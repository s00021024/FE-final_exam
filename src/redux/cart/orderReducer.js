const initialState = {
    orders: [],
    loading: false,
    error: "",
  };
  
  export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
      case "cart/FETCH_ORDERS_OK":
        return {
          ...state,
          orders: action.payload,
          loading: false,
        };
      case "cart/FETCH_ORDERS_ERROR":
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  }