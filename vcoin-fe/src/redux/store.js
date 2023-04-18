import { configureStore } from '@reduxjs/toolkit';

import transactionReducer from './reducers/transactionReducer';
import blockReducer from './reducers/blockReducer';
import walletReducer from './reducers/wallet';
const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    blocks: blockReducer,
    wallets: walletReducer,
  },
});

export default store;
