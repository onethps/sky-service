import React, { FC } from 'react';
import { Controls } from 'components/Controls';
import { ProductType } from 'pages/Products/types';

import { TableBody, Typography } from '@mui/material';
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
        <Controls.Select
          name={'category'}
          value={row.category}
          onChange={() => console.log('')}
          options={[{ id: 1, title: '--' }]}
        />
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
        <Controls.Select
          style={{ background: row.inSale ? 'green' : 'red', color: 'white' }}
          name={'inSale'}
          value={row.inSale ? 'Так' : 'Ні'}
          onChange={() =>
            updateProductCategories(row._id as string, {
              ...row,
              inSale: !row.inSale,
            })
          }
          options={[
            { id: 1, title: 'Так' },
            { id: 2, title: 'Ні' },
          ]}
        />
      </TableCell>
    </TableRow>
  );
};
