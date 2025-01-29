"use client"
import { createSlice } from '@reduxjs/toolkit'

interface CartItem {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  size?: string;
}

const initialState: CartItem[] = [];

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { _id, size } = action.payload;
      const existingItem = state.find(item => item._id === _id && item.size === size);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      return state.filter(item => item._id !== action.payload);
    },
    incrementQuantity(state, action) {
      const item = state.find(item => item._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity(state, action) {
      const item = state.find(item => item._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    }
  },
})

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = CartSlice.actions
export default CartSlice.reducer