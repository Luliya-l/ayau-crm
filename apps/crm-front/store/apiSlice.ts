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
    setTasks(state, action) {
      state.tasks.push(action.payload);
    },
    deleteTasks(state, action) {
      state.tasks.splice(action.payload, 1);
    },
    updateTasks(state, action) {
      state.tasks[action.payload[1]] = action.payload[0];
    },
    setContacts(state, action) {
      state.contacts.push(action.payload);
    },
    deleteContacts(state, action) {
      state.contacts.splice(action.payload, 1);
    },
    updateContacts(state, action) {
      state.contacts[action.payload[1]] = action.payload[0];
    },
    setContracts(state, action) {
      state.contracts = {...action.payload};
    },
    setCustomers(state, action) {
      state.customers = {...action.payload};
    },
    setFiles(state, action) {
      state.files = {...action.payload};
    },
    setStates(state, action) {
      state.states = {...action.payload};
    },
    setMails(state, action) {
      state.mails = {...action.payload};
    }
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
  setTasks, 
  deleteTasks,
  updateTasks,
  setContacts, 
  deleteContacts,
  updateContacts,
  setContracts, 
  setCustomers, 
  setFiles, 
  setStates, 
  setMails 
} = apiSlice.actions;

export const useAPI = (state: AppState) => state.api;

export default apiSlice.reducer;