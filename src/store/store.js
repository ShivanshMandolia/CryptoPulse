import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from './cryptoApi';
import { coinsApi } from './coinsApi';
import { newsApi } from './newsApi';

const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [coinsApi.reducerPath]: coinsApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware, coinsApi.middleware,newsApi.middleware),

});

export default store;
