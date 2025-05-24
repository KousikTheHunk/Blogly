// src/store/postsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
  }

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts : (state, action) => {
      state.items = action.payload;
    },
    clearPosts : (state) => {
      state.items = [];
    },
  },
});

export const { setPosts, clearPosts } = postsSlice.actions;
export default postSlice.reducer;
