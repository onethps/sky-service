import React, { FC, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import { Collapse, FormControl, MenuItem, Select } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { Text } from 'recharts';
import { TechCardType } from '../../pages/Products/TechCard/types';

type defaultTableRowType = {
  isItemSelected: boolean;
  row: any;
  handleClick: (event: any, name: string) => void;
  labelId: string;
  handleModal: (id: string) => void;
  categoryEl: string;
  handleCategory: (event: any) => void;
  arrayOfCategories: any[];
};

export const TableRowGroup: FC<defaultTableRowType> = ({
  isItemSelected,
  row,
  handleClick,
  labelId,
  handleModal,
  categoryEl,
  handleCategory,
  arrayOfCategories,
}) => {
  const [open, setOpen] = useState(true);
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

        <TableCell component="th" id={labelId} scope="row" padding="none">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <Text onClick={() => handleModal(row._id as string)}>{row.name}</Text>
        </TableCell>

        <TableCell align="left" onClick={() => handleModal(row._id as string)}>
          {row.productType === 'one' ? 'Поштучно/Ингридиент' : 'Тех.карта'}
        </TableCell>
        <TableCell align={'left'}>
          <FormControl>
            <Select
              autoWidth
              id="category-select"
              value={row.category || categoryEl}
              onChange={handleCategory}
            >
              {arrayOfCategories.map((el) => (
                <MenuItem value={el.title} key={el.id}>
                  {el.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableCell>

        <TableCell
          align="right"
          onClick={() => handleModal(row._id as string)}
        ></TableCell>
        <TableCell
          align="right"
          onClick={() => handleModal(row._id as string)}
        ></TableCell>
        <TableCell
          align="right"
          onClick={() => handleModal(row._id as string)}
        ></TableCell>
        <TableCell align="left">
          <FormControl size="small">
            <Select
              autoWidth
              id="select-inSale-status"
              value={row.inSale}
              // onChange={}
            >
              <MenuItem value={1}>Да</MenuItem>
              <MenuItem value={0}>Нет</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
      </TableRow>
      <TableRow>
        {/*////////////////////*/}
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TableContainer>
              <Table sx={{ minWidth: 750 }} size={'medium'}>
                {[...row.mod, ...row.mod].map((el: TechCardType) => {
                  return (
                    <TableRow>
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell align="left" sx={{ maxWidth: '60px' }} component="th">
                        {el.modName}
                      </TableCell>
                      <TableCell align="center" component="th">
                        Склад
                      </TableCell>
                      {[...new Array(6)].map((el) => (
                        <TableCell align="right"> </TableCell>
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
              </Table>
            </TableContainer>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
