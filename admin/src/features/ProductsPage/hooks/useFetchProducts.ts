import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';

import { fetchProducts } from '../bll/middleware/products';

export const useFetchProducts = () => {
  const products = useAppSelector((state) => state.products.products);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return { products };
};
