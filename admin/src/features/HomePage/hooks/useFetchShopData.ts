import * as React from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';

import { fetchShop } from '../bll/shopSlice';

export const useFetchShopData = (userId: string) => {
  const store = useAppSelector((store) => store.shop);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchShop({ userId }));
  }, []);

  return { store };
};
