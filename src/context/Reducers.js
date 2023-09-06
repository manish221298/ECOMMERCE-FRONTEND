import { act } from "react-dom/test-utils";

export const cartReducer = (state, action) => {
  console.log("inside reducer", action);
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((cart) => cart.id !== action.payload.id),
      };

    case "CHANGE_ITEM_QTY":
      return {
        ...state,
        cart: state.cart.filter((cart) =>
          cart.id === action.payload.id
            ? (cart.qty = action.payload.qty)
            : cart.qty
        ),
      };

    default:
      return state;
  }
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };

    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload };

    case "FILTER_BY_DELIVERY":
      return { ...state, byFastDelivery: !state.byFastDelivery };

    case "FILTER_BY_STOCK":
      return { ...state, byStock: !state.byStock };

      case "FILTER_BY_SEARCH":
        return {...state, searchQuery: action.payload}

    case "CLEAR_FILTER":
      return {
        byStock: false,
        searchQuery: "",
        byRating: 0,
        byFastDelivery: false,
      };

    default:
      return state;
  }
};
