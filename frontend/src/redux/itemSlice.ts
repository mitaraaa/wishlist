import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Item } from "@/types/item";

export interface ItemState {
  items: Item[];
}

const initialState: ItemState = {
  items: [],
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItem: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      state.items[index] = action.payload;
    },
    updateItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addItem, removeItem, updateItem, updateItems } =
  itemSlice.actions;
export default itemSlice.reducer;
