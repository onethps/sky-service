import React, { FC } from 'react';
import { IProduct } from 'interfaces/product.interfaces';

import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

type TableRowNormalType = {
  isItemSelected: boolean;
  row: IProduct;
  handleClick: (event: any, name: string) => void;
  labelId: string;
  handleModal: (id: string) => void;
  updateProductCategories: (id: string, product: IProduct) => void;
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
      key={row.id}
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
        onClick={() => handleModal(row.id as string)}
        sx={{ textAlign: 'center', paddingRight: '40px' }}
      >
        {row.name}
      </TableCell>

      <TableCell align="left" onClick={() => handleModal(row.id as string)}>
        {row.type === 'one' ? 'Поштучно/Ингридиент' : 'Тех.карта'}
      </TableCell>
      <TableCell align={'left'}>
        <FormControl>
          <Select name={'category'} value={row.category}>
            <MenuItem value="--">--</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="right" onClick={() => handleModal(row.id as string)}>
        <Typography>{row.price} ₴</Typography>
      </TableCell>
      <TableCell align="right" onClick={() => handleModal(row.id as string)}>
        {row.price} ₴
      </TableCell>
      <TableCell align="right" onClick={() => handleModal(row.id as string)}>
        {row.price} %
      </TableCell>
      <TableCell align="left">
        <FormControl>
          <Select
            style={{ background: row.saleStatus ? 'green' : 'red', color: 'white' }}
            name={'inSale'}
            value={row.saleStatus ? 'Так' : 'Ні'}
            onChange={() =>
              updateProductCategories(row.id as string, {
                ...row,
                saleStatus: row.saleStatus,
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
