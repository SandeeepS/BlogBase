import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../interfaces/authState";

const initialState: AuthState = {
  userData: null,
};

export const authSlice = createSlice({
  name: "BlogBaseAuth",
  initialState,
  reducers: {
    setUserCredential: (state, action) => {
      state.userData = action.payload;
    },
    userLogout: (state) => {
      state.userData = null;
    },
  },
});

export const { setUserCredential, userLogout } = authSlice.actions;

export default authSlice.reducer;
