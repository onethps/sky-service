import React, { FC, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import { Box, Collapse, TableBody, TableHead, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Table from '@mui/material/Table';
import { TechCardType } from '../../pages/Products/TechCard/types';
import { Controls } from '../Controls';

type defaultTableRowType = {
  isItemSelected: boolean;
  row: any;
  handleClick: (event: any, name: string) => void;
  labelId: string;
  handleModal: (id: string) => void;
};

export const TableRowGroup: FC<defaultTableRowType> = ({
  isItemSelected,
  row,
  handleClick,
  labelId,
  handleModal,
}) => {
  const [open, setOpen] = useState(true);

  const handleClickOnCheckBoxElem = (event: any) => {
    handleClick(event, row.name as string);
  };

  const handleModalToggle = () => {
    handleModal(row._id as string);
  };

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row._id}
        selected={isItemSelected}
        sx={{ cursor: 'pointer' }}
      >
        <TableCell
          padding="checkbox"
          ///make margin left on checkbox size
        >
          <Checkbox
            color="primary"
            onClick={handleClickOnCheckBoxElem}
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': labelId,
            }}
          />
        </TableCell>

        <TableCell component="th" id={labelId} scope="row" padding="none">
          <IconButton
            sx={{ display: 'inline-block' }}
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <Typography sx={{ display: 'inline-block' }} onClick={handleModalToggle}>
            {row.name}
          </Typography>
        </TableCell>

        <TableCell align="left" onClick={handleModalToggle}>
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

        <TableCell align="right" onClick={handleModalToggle}></TableCell>
        <TableCell align="right" onClick={handleModalToggle}></TableCell>
        <TableCell align="right" onClick={handleModalToggle}></TableCell>
        <TableCell align="left">
          <Controls.Select
            style={{ background: row.inSale ? 'green' : 'red', color: 'white' }}
            name={'inSale'}
            value={row.inSale ? 'Так' : 'Ні'}
            onChange={() => console.log('')}
            options={[
              { id: 1, title: 'Так' },
              { id: 2, title: 'Ні' },
            ]}
          />
        </TableCell>
      </TableRow>
      {/*////////////////////*/}

      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Table sx={{ minWidth: 750 }} size={'medium'} component={'td'}>
            <TableBody>
              {[...row.mod].map((el: TechCardType) => {
                return (
                  <TableRow key={el.productId}>
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell align="left" sx={{ maxWidth: '60px' }}>
                      {el.modName}
                    </TableCell>
                    <TableCell align="center">Склад</TableCell>
                    {[...new Array(6)].map((el, i) => (
                      <TableCell align="right" key={i}>
                        {' '}
                      </TableCell>
                    ))}
                    <TableCell align="left">{el.netPriceMod} ₴</TableCell>
                    <TableCell align="center">{el.priceMod} ₴</TableCell>
                    <TableCell align="right">{el.marginPricePercentMod} %</TableCell>
                    <TableCell
                      align="center"
                      sx={{ maxWidth: '100px', minWidth: '85px' }}
                    ></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </>
  );
};
