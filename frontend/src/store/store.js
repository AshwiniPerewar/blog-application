// frontend/src/store.js

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // If you need thunk middleware
import authReducer from './user/authReducer';
import postReducer from './posts/postReducer';

const rootReducer = combineReducers({
  user: authReducer,
  posts:postReducer,
  // other reducers can be added here if you have them
});

const store = configureStore({
  reducer:rootReducer,applyMiddleware:(thunk)
});

export default store;
