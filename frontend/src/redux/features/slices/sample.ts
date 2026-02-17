import { createSlice } from "@reduxjs/toolkit";

interface MenuState {
  isCollapsed: boolean;
}

const initialState: MenuState = {
  isCollapsed: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
  },
});

export const { toggleMenu } = navbarSlice.actions;
export default navbarSlice.reducer;
