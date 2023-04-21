import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Favourite {
  id: number;
  image: string;
  name: string;
  shortDescription: string;
  price: string;
  about:string;
  rating:string;
  time:string;
}

interface FavouriteState {
  items: Favourite[];
}

const initialState: FavouriteState = {
  items: []
};

export const favouriteSlice = createSlice({
  name: "favourites",
  initialState,
  reducers:{ 
    like: (state, action: PayloadAction<Favourite>) => {
      state.items.push(action.payload);
    },
    unlike: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { like, unlike } = favouriteSlice.actions;
export default favouriteSlice.reducer;
