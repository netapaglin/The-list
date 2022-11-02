import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, createStore, Store } from "redux";
import { tasksReducer } from "./TaskState";


// Creating reducers object from all our reducers: 
// const reducers = combineReducers({ productsState: productsReducer, employeesState: employeesReducer, customersState: customersReducer });
const reducers = combineReducers({ tasksState: tasksReducer });

// The most important Redux object: 
const store = configureStore({ reducer: reducers });

export type RootState = ReturnType<typeof store.getState>

export default store;
