import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { User } from "../specs/custom-types";

export interface AuthState {
  user: User;
  authState: boolean;
  authToken: string;
  refreshToken: string;
  smsCode: "";
  rememberMe: boolean;
  acceptTerms: boolean;
}

const initialState: AuthState = {
  user: { 
    id: "",
    name: "",
    phone: "",
    role: "",
    email: "",
    gender: "",
    birthdate: "",
  },
  authState: false,
  authToken: "",
  refreshToken: "",
  smsCode: "",
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
    setSmsCode(state, action) {
      state.smsCode = action.payload;
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

export const { setUser, setAuthState, setTokens, setSmsCode, setRememberMe, setAcceptTerms } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth;

export default authSlice.reducer;