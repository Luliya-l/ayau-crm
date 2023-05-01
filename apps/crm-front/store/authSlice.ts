import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { User } from "../specs/custom-types";

export interface AuthState {
  user: User;
  authState: boolean;
  authToken: string;
  refreshToken: string;
  rememberMe: boolean;
  acceptTerms: boolean;
}

const initialState: AuthState = {
  user: { 
    id: "0",
    name: "",
    phone: "",
    role: "",
    email: "",
    gender: "",
    birthdate: null,
    login: "",
    password: "",
    created_at: null,
    updated_at: null,
  },
  authState: false,
  authToken: "",
  refreshToken: "",
  rememberMe: false,
  acceptTerms: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = {...action.payload};
    },
    setAuthState(state, action) {
      state.authState = action.payload;
    },
    setTokens(state, action) {
      state.authToken = action.payload.authToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setRememberMe(state, action) {
      state.rememberMe = action.payload;
    },
    setAcceptTerms(state, action) {
      state.acceptTerms = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action['payload']['auth'],
        }
    })
  },
});

export const { setUser, setAuthState, setTokens, setRememberMe, setAcceptTerms } = authSlice.actions;

export const useAuth = (state: AppState) => state.auth;

export default authSlice.reducer;