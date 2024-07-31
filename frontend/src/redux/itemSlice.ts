import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { Item } from "@/types/item";
import findFirstFreeSpot from "@/utils/free-grid-spot";

export type ItemData = Omit<Item, "id" | "row" | "column" | "width" | "height">;

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
    addItem: (state, action: PayloadAction<ItemData>) => {
      const id = uuidv4();
      const spot = findFirstFreeSpot(state.items, 1, 1, 5);

      state.items.push({ id, ...action.payload, ...spot, width: 1, height: 1 });
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
