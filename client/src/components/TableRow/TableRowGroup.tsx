import React, { FC, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import { Box, Collapse, FormControl, MenuItem, Select } from '@mui/material';
import { ProductType } from 'pages/Products/types';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { Text } from 'recharts';

type StandartTableRowType = {
  isItemSelected: boolean;
  row: any;
  handleClick: (event: any, name: string) => void;
  labelId: string;
  handleModal: (id: string) => void;
  categoryEl: string;
  handleCategory: (event: any) => void;
  arrayOfCategories: any[];
};

export const TableRowGroup: FC<StandartTableRowType> = ({
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
          {row.productType}
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
        <TableCell align="right" onClick={() => handleModal(row._id as string)}>
          {row.netPrice} ₴
        </TableCell>
        <TableCell align="right" onClick={() => handleModal(row._id as string)}>
          {row.price} ₴
        </TableCell>
        <TableCell align="right" onClick={() => handleModal(row._id as string)}>
          {row.marginPrice} %
        </TableCell>
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
                <TableRow>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell align="left" sx={{ maxWidth: '60px' }} component="th">
                    Латте Мокачино
                  </TableCell>
                  <TableCell align="center" component="th">
                    Склад
                  </TableCell>
                  <TableCell align="right"> </TableCell>
                  <TableCell align="right"> </TableCell>
                  <TableCell align="right"> </TableCell>
                  <TableCell align="right">22</TableCell>
                  <TableCell align="right">45</TableCell>
                  <TableCell align="right">12</TableCell>
                  <TableCell align="center" sx={{ maxWidth: '100px', minWidth: '85px' }}>
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
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell align="left" component="th">
                    кк
                  </TableCell>
                  <TableCell align="center">Склад</TableCell>
                  <TableCell align="right"> </TableCell>
                  <TableCell align="right"> </TableCell>
                  <TableCell align="right"> </TableCell>
                  <TableCell align="right">22</TableCell>
                  <TableCell align="right">45</TableCell>
                  <TableCell align="right">12</TableCell>
                  <TableCell align="center" sx={{ maxWidth: '100px', minWidth: '85px' }}>
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
              </Table>
            </TableContainer>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
