import { FC, useState } from 'react';
import { TechCardType } from 'features/ProductsPage/types/types';
import { CustomSelect } from 'shared/components/CustomSelect/CustomSelect';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Collapse, TableBody, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

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
    handleModal(row.id as string);
  };

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
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
          <CustomSelect
            name="category"
            value={row.category}
            menuItems={[{ id: '1', value: '--' }]}
            label="Category"
          />
        </TableCell>

        <TableCell align="right" onClick={handleModalToggle}></TableCell>
        <TableCell align="right" onClick={handleModalToggle}></TableCell>
        <TableCell align="right" onClick={handleModalToggle}></TableCell>
        <TableCell align="left">
          <CustomSelect
            label="inSale"
            style={{ background: row.inSale ? 'green' : 'red', color: 'white' }}
            name={'inSale'}
            value={row.inSale ? 'Да' : 'Нет'}
            menuItems={[
              { id: '1', value: 'Да' },
              { id: '2', value: 'Нет' },
            ]}
          />
        </TableCell>
      </TableRow>

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
