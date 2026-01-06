import { configureStore } from "@reduxjs/toolkit";
import { carReducer } from "./car/carReducer";
import { usersReducer } from "./users/usersReducer";
import { cartReducer } from "./cart/cartReducer";
import { ordersReducer } from "./cart/orderReducer";

const store = configureStore({
  reducer: {
    users: usersReducer,
    cars: carReducer,
    cart: cartReducer,
    orders: ordersReducer
  },
});

export default store;
