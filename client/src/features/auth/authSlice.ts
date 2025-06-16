import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userEmail: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  userEmail: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; email: string }>
    ) => {
      state.token = action.payload.token;
      state.userEmail = action.payload.email;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.userEmail = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
