import React, { createContext, useContext, useReducer } from "react";
import * as faker from "faker";
import { cartReducer } from "./Reducers";
import {  productReducer } from "./Reducers"

const Cart = createContext();
faker.seed(99)

const Context = ({ children }) => {

    const randomImageUrls = [
        'https://loremflickr.com/640/480/sport',
        'https://loremflickr.com/640/480/city',
        'https://loremflickr.com/640/480/nature',
        'https://loremflickr.com/640/480/cat',
        'https://loremflickr.com/640/480/nature',
        'https://loremflickr.com/640/480'
      ];

  const products = [...Array(12)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.random.arrayElement(randomImageUrls),
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
    data: []
  });

  const [productState, productDispatch] = useReducer( productReducer, {
    byStock: false,
    searchQuery: "",
    byRating: 0,
    byFastDelivery: false,
  })

  return <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>{children}</Cart.Provider>;
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
