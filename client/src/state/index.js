import { createSlice } from "@reduxjs/toolkit";

/* Global statement */
const initialState = {
  mode: "light",
  friendshipMode: "FollowedList",
  users: [],
  token: null,
  posts: [],
  friendship: [],
};
/* a "slice name", an initial state, an object full of reducer functions ...*/
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setFrienshipMode: (state) => {
      state.friendshipMode =
        state.friendshipMode === "FollowedList"
          ? "FollowedList"
          : "FollowerList";
    },
    setLogin: (state, action) => {
      state.users = action.payload.users;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.users = [];
      state.token = null;
      state.friendship = [];
    },
    setFriendship: (state, action) => {
      if (state.users) {
        state.friendship = action.payload.friendship;
      } else {
        console.log("Unvalid Action.");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post.id === action.payload.post.id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const {
  setMode,
  setFrienshipMode,
  setLogin,
  setLogout,
  setFriendship,
  setPosts,
  setPost,
} = authSlice.actions;

export default authSlice.reducer;
