import { clearCart } from "./cartActions"

const API_URL = "http://localhost:3001";


export const submitOrder = orderData => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })
      const data = await response.json()
      console.log("Order submitted successfully! ", data)
      dispatch(clearCart())
    } catch (error) {
      console.log(error)
    }
  }
}


export const fetchUserOrders = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/orders?userId=${userId}`);
      const data = await response.json();

      dispatch({
        type: "cart/FETCH_ORDERS_OK",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "cart/FETCH_ORDERS_ERROR",
        payload: error.message,
      });
    }
  };
};

export const fetchAllOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/orders`);
      const data = await response.json();

      dispatch({
        type: "cart/FETCH_ORDERS_OK",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "cart/FETCH_ORDERS_ERROR",
        payload: error.message,
      });
    }
  };
};
