import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { langSlice } from "./langSlice";
import {nextReduxCookieMiddleware, wrapMakeStore} from "next-redux-cookie-wrapper";
import { createWrapper } from "next-redux-wrapper";
import { useDispatch } from "react-redux";

const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [langSlice.name]: langSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      nextReduxCookieMiddleware({
        secure: true,
        subtrees: [
          "auth.user",
          "auth.authState",
          "auth.authToken",
          "auth.refreshToken",
          "auth.smsCode",
          "auth.rememberMe",
          "auth.acceptTerms",
          "cart.cart"
        ],
      })
    ),
    devTools: true,
  }));

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const wrapper = createWrapper<AppStore>(makeStore, {debug: false});