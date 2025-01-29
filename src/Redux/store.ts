"use client"
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import CartSlice from './features/cartSlice'
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/lib/persistReducer';

const persistConfig = {
  key: "root",
  version: 1,
  storage,
}

const reducer = combineReducers({
  cart: CartSlice
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}),
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch