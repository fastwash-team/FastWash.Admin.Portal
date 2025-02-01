import { getCookie } from "@/utils/libs";
import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
  initialState: {
    user: getCookie("_ac") || {},
    loggedIn: false,
  },
  name: "auth",
  reducers: {
    loginSuccess: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        loggedIn: true,
        user: payload,
      };
    },
    logout: () => ({
      loggedIn: false,
      user: {},
    }),
  },
});

// Action creators are generated for each case reducer function
export const { loginSuccess, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
