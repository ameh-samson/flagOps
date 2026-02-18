import type { User } from "@/redux/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit/react";

type UserState = {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
};

const initialState: UserState = {
  user: null,
  isLoading: false,
  isError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isError = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isError = false;
      state.isLoading = false;
    },
  },
});

export const { setUser, setLoading, setError, clearUser } = userSlice.actions;
export default userSlice.reducer;
