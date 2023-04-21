import { configureStore } from "@reduxjs/toolkit"
import  authSlice  from "./slice/auth"
import { cartSlice } from "./slice/cart"
import { favouriteSlice } from "./slice/favourite"

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice.reducer,
    favourite: favouriteSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store