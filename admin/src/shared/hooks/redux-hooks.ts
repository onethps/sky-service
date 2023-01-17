import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatchType, AppRootStateType } from 'redux TK/store';

export const useAppDispatch: () => AppDispatchType = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
