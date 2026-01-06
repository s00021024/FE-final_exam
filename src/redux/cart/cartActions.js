export const addToCart = (item) => ({
    type: "cart/ADD_TO_CART",
    payload: item
});

export const removeFromCart = (itemId) => ({
    type: "cart/REMOVE_FROM_CART",
    payload: itemId
});

export const increaseQuantity = (itemId) =>({
    type: "cart/INCREASE_QUANTITY",
    payload: itemId
})
export const decreaseQuantity = (itemId) =>({
    type: "cart/DECREASE_QUANTITY",
    payload: itemId
})

export const clearCart = () => ({
    type: "cart/CLEAR_CART",
  })