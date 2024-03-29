import { ChangeEvent, FC } from 'react';
import { optionsPriceFor } from 'features/ProductsPage/components/TechCard';
import { categories } from 'features/ProductsPage/constants/categories.data';
import { TechCardType } from 'features/ProductsPage/types/types';
import { IProduct } from 'interfaces/product.interfaces';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { calcNetValuePerHungeredGram, calcNetValuePerPortion } from 'utlis/helpers';
import { v4 as uuidv4 } from 'uuid';

import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import {
  Box,
  Button,
  IconButton,
  Input,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 15px',
  color: theme.palette.primary.main,
  fontWeight: '700',
  cursor: 'pointer',
}));

const GroupItems = styled('ul')({
  padding: 0,
});

type ModTableType = {
  currentTechCard: TechCardType;
  techCardIndex: number;
  initTechCardList: TechCardType[];
  setInitTechCardList: (techCards: TechCardType[]) => void;
};

export const ModTable: FC<ModTableType> = ({
  currentTechCard,
  techCardIndex,
  initTechCardList,
  setInitTechCardList,
}) => {
  const products = useAppSelector((state) => state.products.products);

  const handleInputs = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    tabIndex: number,
  ) => {
    const value: any = [...initTechCardList];
    value[techCardIndex][tabIndex][event.target.name] = event.target.value;
    setInitTechCardList(value);
  };

  const addNewRow = () => {
    const newTableRow = {
      id: uuidv4(),
      name: null,
      quantity: 0,
      bruto: 0,
      neto: 0,
      price: 0,
      summ: 0,
    };
    const value: any = [...initTechCardList];
    value[techCardIndex].tablesMod.push(newTableRow);
    setInitTechCardList(value);
  };

  const removeRow = (index: number) => {
    const value: any = [...initTechCardList];
    value[techCardIndex].tablesMod.splice(index, 1);
    setInitTechCardList(value);
  };

  const handleName = (event: any, newValue: any, tabIndex: number) => {
    const product = products.filter((el) => el.name === newValue)[0];
    const values: any = [...initTechCardList];
    values[techCardIndex].tablesMod[tabIndex]['name'] = newValue;
    values[techCardIndex].tablesMod[tabIndex]['price'] = product.price;
    setInitTechCardList(values);
  };

  const handleCountInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    tabIndex: number,
  ) => {
    const value: any = [...initTechCardList];
    const currentRow = value[techCardIndex].tablesMod[tabIndex];
    currentRow.quantity = +event.target.value;
    currentRow.summ = +(currentRow.quantity * currentRow.price).toFixed(2);

    if (optionsPriceFor[0].value === currentTechCard.categoryPerPriceMod) {
      value[techCardIndex].netPriceMod = calcNetValuePerPortion(
        value[techCardIndex].tablesMod,
      );
    }
    if (optionsPriceFor[1].value === currentTechCard.categoryPerPriceMod) {
      value[techCardIndex].netPriceMod = calcNetValuePerHungeredGram(
        value[techCardIndex].tablesMod,
      );
    }
    setInitTechCardList(value);
  };

  return (
    <MuiTable sx={{ maxWidth: '400px' }}>
      <TableHead>
        <TableRow>
          {categories.map((headText) => (
            <TableCell align="left" key={headText.id}>
              {headText.title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {currentTechCard.tablesMod.map((row, index) => {
          return (
            <TableRow
              key={row.id}
              sx={{
                '.MuiTableCell-root': {
                  border: 0,
                  padding: 1,
                },
              }}
            >
              <TableCell>
                <Autocomplete
                  value={row.name}
                  defaultValue={null}
                  options={products.length ? products.map((el: IProduct) => el.name) : []}
                  onChange={(event, newValue) => handleName(event, newValue, index)}
                  renderInput={(params) => (
                    <TextField {...params} label={'Name'} error={!row.name} />
                  )}
                  groupBy={(o) => ' '}
                  renderGroup={(params) => (
                    <>
                      <GroupHeader
                        onClick={() => console.log('adde new product feature')}
                      >
                        Додати товар
                      </GroupHeader>
                      <GroupItems>{params.children}</GroupItems>
                    </>
                  )}
                />
              </TableCell>
              <TableCell>
                <Input
                  type={'Number'}
                  name={'quantity'}
                  value={row.quantity}
                  onChange={(event: any) => handleCountInput(event, index)}
                />
              </TableCell>
              <TableCell>
                <Typography>{row.bruto}</Typography>
              </TableCell>
              <TableCell>
                <Input
                  name={'neto'}
                  value={row.neto}
                  onChange={(event: any) => handleInputs(event, index)}
                />
              </TableCell>
              <TableCell>
                <Typography>{row.price}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{row.summ}</Typography>
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => removeRow(index)}
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <DeleteSweepIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <Box sx={{ display: 'flex' }}>
        <IconButton>
          <Button onClick={addNewRow} variant={'contained'} color={'success'}>
            +
          </Button>
        </IconButton>
        <IconButton>
          <Button variant={'outlined'} color={'success'}>
            Добавить товары
          </Button>
        </IconButton>
      </Box>
    </MuiTable>
  );
};
