import React, { FC } from 'react';
import { ProductType } from 'features/ProductsPage/bll/types';

import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

type TableRowNormalType = {
  isItemSelected: boolean;
  row: ProductType;
  handleClick: (event: any, name: string) => void;
  labelId: string;
  handleModal: (id: string) => void;
  updateProductCategories: (id: string, product: ProductType) => void;
};

export const TableRowNormal: FC<TableRowNormalType> = ({
  isItemSelected,
  row,
  handleClick,
  labelId,
  handleModal,
  updateProductCategories,
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
          onClick={(event) => handleClick(event, row.name)}
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
        {row.productType === 'one' ? 'Поштучно/Ингридиент' : 'Тех.карта'}
      </TableCell>
      <TableCell align={'left'}>
        <FormControl>
          <Select name={'category'} value={row.category}>
            <MenuItem value="--">--</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="right" onClick={() => handleModal(row._id as string)}>
        <Typography>{row.netPrice} ₴</Typography>
      </TableCell>
      <TableCell align="right" onClick={() => handleModal(row._id as string)}>
        {row.price} ₴
      </TableCell>
      <TableCell align="right" onClick={() => handleModal(row._id as string)}>
        {row.marginPrice} %
      </TableCell>
      <TableCell align="left">
        <FormControl>
          <Select
            style={{ background: row.inSale ? 'green' : 'red', color: 'white' }}
            name={'inSale'}
            value={row.inSale ? 'Так' : 'Ні'}
            onChange={() =>
              updateProductCategories(row._id as string, {
                ...row,
                inSale: row.inSale === 'no' ? 'yes' : 'no',
              })
            }
          />
          <MenuItem value="yes">Так</MenuItem>
          <MenuItem value="no">Ні</MenuItem>
        </FormControl>
      </TableCell>
    </TableRow>
  );
};
