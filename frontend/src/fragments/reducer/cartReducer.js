//manage all the cart operations
export const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "InitProduct":
      return {
        ...state,
        products: payload.products,
      };
    case "AddToCart":
      return {
        ...state,
        products: [...state.products, payload.products],
      };
    case "removeOne":
      //filter out
      return {
        ...state,
        products: payload.newCart,
      };
    case "updateQuantity":
      return {
        ...state,
        products: payload.products,
      };
    case "reset":
      return {
        ...state,
        products: []
      }
    default:
      return state;

  }
};
