const initialState = {
  items: [],
  total: 0,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "cart/ADD_TO_CART": {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let updateItems = [];
      if (index >= 0) {
        updateItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updateItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      const updatedTotal = updateItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return { ...state, items: updateItems, total: updatedTotal };
    }

    case "cart/INCREASE_QUANTITY": {
      const updateItems = state.items.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      const updatedTotal = updateItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return { ...state, items: updateItems, total: updatedTotal };
    }
    case "cart/DECREASE_QUANTITY": {
      const updateItems = state.items.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      const updatedTotal = updateItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return { ...state, items: updateItems, total: updatedTotal };
    }

    case "cart/REMOVE_FROM_CART": {
      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      const updatedTotal = filteredItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return { ...state, items: filteredItems, total: updatedTotal };
    }

    case "cart/CLEAR_CART":
      return { ...state, items: [], total: 0 };

    default:
      return state;
  }
};
