import { configureStore } from '@reduxjs/toolkit'
import Itemreducer from './Item/itemSlice'
// ...

export const store = configureStore({
  reducer: {
    basket: Itemreducer,

  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch