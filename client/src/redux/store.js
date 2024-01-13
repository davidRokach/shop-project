import { configureStore } from '@reduxjs/toolkit'
import { userApi } from './feature/userApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import userSlice from './feature/userSlice';
import { productApi } from './feature/productApi';

export const store = configureStore({
  reducer: {
    userSlice,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(userApi.middleware,productApi.middleware),
})

setupListeners(store.dispatch)

