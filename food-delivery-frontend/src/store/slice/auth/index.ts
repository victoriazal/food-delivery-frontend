import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isLogged: boolean;
}
const initialState = {
  user:{},
  isLogged: false
}

export const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    login(state,action){
      state.user = action.payload
      state.isLogged = true
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("isLogged",  JSON.stringify(state.isLogged));
      console.log('action',action.payload)
      console.log('user from state', state.user)
      console.log("login",state.isLogged)
    },
    logout: (state) => {
      state.user = {};
      state.isLogged = false;
      localStorage.removeItem("user");
    },
    loadUserFromStorage: (state) => {
      const user = localStorage.getItem("user");
      if (user) {
        state.user = JSON.parse(user);
        state.isLogged = true;
      }
    }
  }
})

export const {login,logout,loadUserFromStorage} = authSlice.actions
export default authSlice.reducer