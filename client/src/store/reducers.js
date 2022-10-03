import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from './slice';

export const rootReducer = combineReducers({
  products: productsReducer,
  // app: appReducer,
  // auth: authReducer,
  // todolists: todolistsReducer,
  // tasks: tasksReducer
});
