import React, { FC } from 'react';
import { IProduct } from 'interfaces/product.interfaces';
import { Controller, useForm } from 'react-hook-form';

import { InputAdornment, TextField } from '@mui/material';

import { ProductItem } from './ProductItem';

interface IncomeTable2Props {
  productList: IProduct[];
  setProductList: (productList: IProduct[]) => void;
}

export const IncomeTable2: FC<IncomeTable2Props> = ({ productList, setProductList }) => {
  const { handleSubmit, reset, control } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      {/* <ProductItem control={control} /> */}
      <button onClick={handleSubmit(onSubmit)}>sum</button>
    </>
  );
};
