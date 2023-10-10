import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {PostType} from '@app/types/auth';

type Posts = {
  posts: PostType[] | null;
};

const initialState: Posts = {
  posts: null,
};

const PostSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<PostType[] | null>) {
      state.posts = action.payload;
    },
  },
});

export const {setPosts} = PostSlice.actions;
export default PostSlice.reducer;
