import React, { FC } from 'react';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import { FormControl, MenuItem, Select } from '@mui/material';
import { ProductType } from '../../pages/Products/types';
import { cat } from '../../pages/Products/ProductTableList';

type TableRowNormalType = {
  isItemSelected: boolean;
  row: ProductType;
  handleClick: (event: any, name: string) => void;
  labelId: string;
  handleModal: (id: string) => void;
  categoryEl: string;
  handleCategory: (event: any) => void;
  arrayOfCategories: cat[];
};

export const TableRowNormal: FC<TableRowNormalType> = ({
  isItemSelected,
  row,
  handleClick,
  labelId,
  handleModal,
  categoryEl,
  handleCategory,
  arrayOfCategories,
}) => {
  return (
    <TableRow
      hover
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row._id}
      selected={isItemSelected}
      sx={{ cursor: 'pointer' }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          onClick={(event) => handleClick(event, row.name as string)}
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId,
          }}
        />
      </TableCell>
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        padding="none"
        onClick={() => handleModal(row._id as string)}
        sx={{ textAlign: 'center', paddingRight: '40px' }}
      >
        {row.name}
      </TableCell>

      <TableCell align="left" onClick={() => handleModal(row._id as string)}>
        {row.productType}
      </TableCell>
      <TableCell align={'left'}>
        {/*<FormControl>*/}
        {/*  <Select*/}
        {/*    autoWidth*/}
        {/*    id="category-select"*/}
        {/*    value={row.category || categoryEl}*/}
        {/*    onChange={handleCategory}*/}
        {/*  >*/}
        {/*    {arrayOfCategories.map((el) => (*/}
        {/*      <MenuItem value={el.title} key={el.id}>*/}
        {/*        {el.title}*/}
        {/*      </MenuItem>*/}
        {/*    ))}*/}
        {/*  </Select>*/}
        {/*</FormControl>*/}
      </TableCell>
      {/*<TableCell align="right" onClick={() => handleModal(row._id as string)}>*/}
      {/*  {row.netCost} ₴*/}
      {/*</TableCell>*/}
      {/*<TableCell align="right" onClick={() => handleModal(row._id as string)}>*/}
      {/*  {row.price} ₴*/}
      {/*</TableCell>*/}
      {/*<TableCell align="right" onClick={() => handleModal(row._id as string)}>*/}
      {/*  {row.marginPrice} %*/}
      {/*</TableCell>*/}
      {/*<TableCell align="left">*/}
      {/*  <FormControl size="small">*/}
      {/*    <Select*/}
      {/*      autoWidth*/}
      {/*      id="select-inSale-status"*/}
      {/*      value={row.inSale}*/}
      {/*      // onChange={}*/}
      {/*    >*/}
      {/*      <MenuItem value={1}>Да</MenuItem>*/}
      {/*      <MenuItem value={0}>Нет</MenuItem>*/}
      {/*    </Select>*/}
      {/*  </FormControl>*/}
      {/*</TableCell>*/}
    </TableRow>
  );
};
