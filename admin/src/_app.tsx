import { useEffect } from 'react';
import { ProductSklad } from 'pages/Products/ProductSklad';
import { ProductTableList } from 'pages/Products/ProductTableList';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { fetchProducts } from 'store/reducers/products';

import { Dashboard } from '@mui/icons-material';

export const App = () => {
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchProducts() as any);
  // }, []);

  return (
    <>
      <div>hellos its APP COMPONENTS</div>
    </>
  );
};
