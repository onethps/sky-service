import { useEffect } from 'react';
import { ProductTableList } from 'features/ProductsPage/ProductsPage';
import { ProductSklad } from 'features/ProductsPage/ui/ProductSklad';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Dashboard } from '@mui/icons-material';

export const App = () => {
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchProducts() as any);
  // }, []);

  return (
    <>
      <div>Hello World</div>
    </>
  );
};
