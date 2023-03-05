import { ChangeEvent, FC, SyntheticEvent, useState } from 'react';
import { NewProductModal } from 'features/HomePage/components/NewProductModal';
import { IProduct } from 'interfaces/product.interfaces';
import { useAppSelector } from 'shared/hooks/redux-hooks';
import { generateNewProductField } from 'utlis/helpers';

import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import {
  IconButton,
  Input,
  InputAdornment,
  Select,
  SelectChangeEvent,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { modTableCategories } from './constants';

const columnSpacing = 3;

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

type TableType = {
  productList: IProduct[];
  setProductList: (productList: IProduct[]) => void;
};

export const IncomeTable: FC<TableType> = ({ productList, setProductList }) => {
  const products = useAppSelector((state) => state.products.products);
  const [sumOfProducts, setSumOfProducts] = useState<number>(0);
  const [sumOfNetPrice, setSumOfNetPrice] = useState<number>(0);

  const handleInputs = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value: any[] = [...productList];
    const eventVal = Number(event.target.value);

    if (event.target.name === 'quantity') {
      value[index].sum = eventVal * value[index].price;
      calcOfProducts(productList, setSumOfProducts, 'sum');
    }
    if (event.target.name === 'sum') {
      calcOfProducts(productList, setSumOfProducts, 'sum');
    }
    if (event.target.name === 'netPrice') {
      calcOfProducts(productList, setSumOfNetPrice, 'netPrice');
    }

    value[index][event.target.name] = Number(event.target.value)
      ? +event.target.value
      : event.target.value;
    setProductList(value);
  };

  const handleSelects = (index: number, event: SelectChangeEvent<unknown>) => {
    const value: any = [...productList];
    value[index][event.target.name] = event.target.value;
    setProductList(value);
  };

  const calcOfProducts = (
    state: any[],
    setState: (number: number) => void,
    val: string,
  ) => {
    const calcVal = state.reduce((acc, el) => acc + Number(el[val]), 0);
    setState(calcVal);
  };

  const addNewRow = () => {
    const value: IProduct[] = [...productList];
    const newRow: IProduct = generateNewProductField();
    value.push(newRow);
    setProductList(value);
  };
  const handleRemoveTableRow = (index: number) => {
    const value: any = [...productList];
    value.splice(index, 1);
    setProductList(value);
  };

  const handleInput = (value: string | null, index: number) => {
    if (!value) {
      return;
    }

    const currentProduct = products.find((product) => product.name === value);
    const values = [...productList];
    if (!currentProduct) return;
    values[index] = { ...currentProduct };
    setProductList(values);
  };

  const [openNewProductModal, setOpenNewProductModal] = useState(false);

  const handleName = (event: SyntheticEvent, newValue: string | null, index: number) => {
    handleInput(newValue, index);
  };

  const addNewProductModalToggle = () => {
    setOpenNewProductModal(true);
  };

  const setNewProductInTableRow = (index: number, newProduct: IProduct) => {
    const tableData = [...productList];

    tableData[index] = { ...newProduct };
    setProductList(tableData);
  };

  return (
    <MuiTable>
      <TableHead>
        <TableRow>
          {modTableCategories.map((headText) => (
            <TableCell align="left" key={headText.id}>
              {headText.title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {productList.map((row: IProduct, index: number) => {
          return (
            <>
              <NewProductModal
                open={openNewProductModal}
                setOpen={setOpenNewProductModal}
                index={index}
                setNewProductInTableRow={setNewProductInTableRow}
              />
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell style={{ width: '40%', whiteSpace: 'nowrap' }}>
                  <Autocomplete
                    value={row.name}
                    defaultValue={null}
                    onChange={(event, newValue) => handleName(event, newValue, index)}
                    renderInput={(params) => (
                      <TextField {...params} label={'Name'} error={row.name === ''} />
                    )}
                    groupBy={(o) => ' '}
                    options={
                      products.length ? products.map((el: IProduct) => el.name) : [' ']
                    }
                    renderGroup={(params) => (
                      <>
                        <GroupHeader onClick={addNewProductModalToggle}>
                          Добавить товар
                        </GroupHeader>
                        <GroupItems>{params.children}</GroupItems>
                      </>
                    )}
                  />
                </TableCell>
                <TableCell style={{ width: '10%', whiteSpace: 'nowrap' }}>
                  <TextField
                    variant="outlined"
                    name={'quantity'}
                    size="small"
                    value={row.quantity}
                    onChange={(e) => handleInputs(index, e)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">{row.unit}</InputAdornment>
                      ),
                    }}
                  />
                </TableCell>
                <TableCell style={{ width: '10%', whiteSpace: 'nowrap' }}>
                  {/* <Select
                    name={'unit'}
                    disabled={row.unit === ''}
                    value={row.unit}
                    onChange={(e) => handleSelects(index, e)}
                    options={[{ id: 1, title: 'шт' }]}
                  /> */}
                </TableCell>
                <TableCell style={{ width: '10%', whiteSpace: 'nowrap' }}>
                  <TextField
                    size="small"
                    variant="outlined"
                    name={'price'}
                    value={row.price}
                    onChange={(e) => handleInputs(index, e)}
                  />
                </TableCell>
                <TableCell style={{ width: '10%', whiteSpace: 'nowrap' }}>
                  <TextField
                    size="small"
                    variant="outlined"
                    name={'sum'}
                    value={row.price}
                    onChange={(e) => handleInputs(index, e)}
                  />
                </TableCell>
                <TableCell style={{ width: '10%', whiteSpace: 'nowrap' }}>
                  <TextField
                    size="small"
                    variant="outlined"
                    name={'price'}
                    value={row.price}
                    onChange={(e) => handleInputs(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleRemoveTableRow(index)}
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <DeleteSweepIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </>
          );
        })}
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell style={{ width: '10%', whiteSpace: 'nowrap' }}>
            <Button variant={'contained'} color={'success'} onClick={addNewRow}>
              +
            </Button>
          </TableCell>
          {/*spacing between columns*/}
          {[...new Array(columnSpacing)].map((el, index) => (
            <TableCell key={index.toString()} />
          ))}
          {/*spacing between columns*/}
          <TableCell style={{ width: '10%', whiteSpace: 'nowrap' }}>
            <Typography>{sumOfProducts} ₴</Typography>
          </TableCell>
          <TableCell style={{ width: '10%', whiteSpace: 'nowrap' }}>
            <Typography>{sumOfNetPrice} ₴</Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </MuiTable>
  );
};
