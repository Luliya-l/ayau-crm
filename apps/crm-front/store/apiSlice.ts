import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { DB } from "../specs/custom-types";
import db from "../data/db/db.json";

const initialState: DB = db;

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {

    setContacts(state, action) {
      state.contacts.push(action.payload);
    },
    deleteContacts(state, action) {
      state.contacts.splice(action.payload, 1);
    },
    updateContacts(state, action) {
      state.contacts[action.payload[1]] = action.payload[0];
    },


    setCustomers(state, action) {
      state.customers.push(action.payload);
    },
    deleteCustomers(state, action) {
      state.customers.splice(action.payload, 1);
    },
    updateCustomers(state, action) {
      state.customers[action.payload[1]] = action.payload[0];
    },

    setFiles(state, action) {
      state.files.push(action.payload);
    },
    deleteFiles(state, action) {
      state.files.splice(action.payload, 1);
    },
    updateFiles(state, action) {
      state.files[action.payload[1]] = action.payload[0];
    },

    setStates(state, action) {
      state.states.push(action.payload);
    },
    deleteStates(state, action) {
      state.states.splice(action.payload, 1);
    },
    updateStates(state, action) {
      state.states[action.payload[1]] = action.payload[0];
    },

    setMails(state, action) {
      state.mails.push(action.payload);
    },
    deleteMails(state, action) {
      state.mails.splice(action.payload, 1);
    },
    updateMails(state, action) {
      state.mails[action.payload[1]] = action.payload[0];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action['payload']['api'],
        }
    })
  },
});

export const { 
  setContacts, 
  deleteContacts,
  updateContacts,

  setCustomers,
  deleteCustomers,
  updateCustomers,

  setFiles, 
  deleteFiles,
  updateFiles,

  setStates, 
  deleteStates,
  updateStates,

  setMails,
  deleteMails,
  updateMails, 
} = apiSlice.actions;

export const useAPI = (state: AppState) => state.api;

export default apiSlice.reducer;