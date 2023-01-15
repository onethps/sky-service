import { useDispatch } from 'react-redux';
import { rootReducer } from 'redux TK/rootReducer';
import thunkMiddleware from 'redux-thunk';

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
});

// redux common types
export type RootReducerType = typeof rootReducer;
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<RootReducerType>;
export type AppDispatchType = typeof store.dispatch;

export const useAppDispatch: () => AppDispatchType = useDispatch;
export type ThunkError = {
  rejectValue: { errors: Array<string>; fieldsErrors?: Array<FieldErrorType> };
};

export type FieldErrorType = { field: string; error: string };
