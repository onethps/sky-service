import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import {
  Box,
  Button,
  IconButton,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import Controls from '../../../../components/Controls';
import { TechCardType } from 'pages/Products/TechCard/types';
import { categories } from 'pages/Products/TechCard/Table/categories';
import { v4 as uuidv4 } from 'uuid';
import { FilmOptionType } from '../../../../components/Controls/AutoComplete';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../selectors';

type ModTableType = {
  currentTechCard: TechCardType;
  techCardIndex: number;
  techCardsList: TechCardType[];
  setTechCardsList: (techCards: TechCardType[]) => void;
};

export const ModTable: FC<ModTableType> = ({
  currentTechCard,
  techCardIndex,
  techCardsList,
  setTechCardsList,
}) => {
  const handleInputs = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    tabIndex: number,
  ) => {
    const value: any = [...techCardsList];

    if (event.target.name === 'count') {
      console.log(value[techCardIndex].modTables[tabIndex].summ);
      console.log(+event.target.value);
      console.log(value[techCardIndex].modTables[tabIndex].price);
      // value[techCardIndex].modTables[tabIndex].summ =
      //   +event.target.value * value[techCardIndex].modTables[tabIndex].price;
    }

    value[techCardIndex].modTables[tabIndex][event.target.name] = event.target.value;
    setTechCardsList(value);
  };

  const handlePrice = () => {};

  const addNewRow = () => {
    const newTableRow = {
      id: uuidv4(),
      name: '',
      count: 0,
      brutto: 0,
      netto: 0,
      price: 0,
      summ: 0,
    };
    const value: any = [...techCardsList];
    value[techCardIndex].modTables.push(newTableRow);
    setTechCardsList(value);
  };

  const removeRow = (index: number) => {
    const value: any = [...techCardsList];
    value[techCardIndex].modTables.splice(index, 1);
    setTechCardsList(value);
  };
  const handleName = (name: string, tabIndex: number, value: string) => {
    const values: any = [...techCardsList];
    values[techCardIndex].modTables[tabIndex][name] = value;
  };

  const [autoInput, setAutoInput] = useState<FilmOptionType | null>(null);

  const products = useSelector(selectProducts);

  // const findPrice = (nameProduct: string, tabIndex: number) => {
  //   const res = products.products.find((el) => el.name === nameProduct);
  //   if (res) {
  //     const values: any = [...techCardsList];
  //     values[techCardIndex].modTables[tabIndex] = res.price;
  //     setTechCardsList(values);
  //   } else {
  //     return '';
  //   }
  // };

  useEffect(() => {
    if (autoInput) {
      const findIndex = products.products.findIndex((el) => el.name === autoInput.title);
      value[techCardIndex].modTables.splice(index, 1);
      setTechCardsList(value);
    }
  }, [autoInput]);

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
        {currentTechCard.modTables.map((row, index) => {
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
                <Controls.AutocompleteInput
                  tabIndex={index}
                  name={'name'}
                  handleName={handleName}
                  value={autoInput}
                  setValue={setAutoInput}
                />
              </TableCell>
              <TableCell>
                <Controls.Input
                  minWidth={'50px'}
                  maxWidth={'80px'}
                  type={'Number'}
                  name={'count'}
                  value={row.count}
                  onChange={(event: any) => handleInputs(event, index)}
                />
              </TableCell>
              <TableCell>
                <Typography>{row.brutto}</Typography>
              </TableCell>
              <TableCell>
                <Controls.Input
                  minWidth={'50px'}
                  maxWidth={'80px'}
                  name={'netto'}
                  value={row.netto}
                  onChange={(event: any) => handleInputs(event, index)}
                />
              </TableCell>
              <TableCell>
                <Typography>{row.price}</Typography>
              </TableCell>
              <TableCell>
                wwww
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
      <Box>
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
