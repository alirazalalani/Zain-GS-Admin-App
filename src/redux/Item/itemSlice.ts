import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

const initialState: any = {
  items: [],
};
export const itemSlice = createSlice({
  name: 'basket',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      // console.log({action: action.payload});
      state.items = [...state.items, action.payload];
    },

    emptyBasket: (state, action) => {
      state.items = action.payload;
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item: any) => item.id === action.payload.id,
      );
      let newBasket = [...state.items];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id:${action.payload.id}) as its not in basket!`,
        );
      }
      state.items = newBasket;
    },
  },
});
export const {addToBasket, removeFromBasket,emptyBasket} = itemSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.basket.items;

export const selectBasketItems = (state: any) => state.basket.items;

export const selectBasketItemsWithId = (state: any, id: any) => {
  // console.log({state: state.basket.items});
  return state.basket.items.filter((item: any) => item.id === id);
};

export const selectBasketTotal = (state: any) =>
  state.basket.items.reduce(
    (total: any, item: any) => (total += +item.price),
    0,
  );
export default itemSlice.reducer;
