import { createSlice } from "@reduxjs/toolkit/react";

type NavbarStates = {
  isMenuCollapsed: boolean;
};
const navbarInitialState: NavbarStates = {
  isMenuCollapsed: false,
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: navbarInitialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuCollapsed = !state.isMenuCollapsed;
    },
  },
});

export const { toggleMenu } = navbarSlice.actions;
export default navbarSlice.reducer;
