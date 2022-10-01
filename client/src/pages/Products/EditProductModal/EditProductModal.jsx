import { Box, Divider, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { instance } from '../../../api/config';
import Controls from '../../../components/Controls';
import CompositionTable from '../CompostionTable/CompositionTable';

const CATEGORIES_ARRAY = [{ id: 1, title: '--' }];
const NAME_LABEL = 'Наименование';
const CATEGORIES_LABEL = 'Категория';
const IN_SALE_CHECKBOX_LABEL = 'Выставить на продажу';
const QUANTITY_LABEL = 'Колличество';
const MIN_QUANTITY_LABEL = 'Минимальный остаток';
const MARGIN_PERCENT = 'Наценка';
const UNIT_VALUE_LABEL = 'Еденица Измерения';
const NET_COST = 'Еденица Измерения';
const PRICE = 'Цена';
const COMPOSITION_NAME = 'Наименовние состава';

const PRODUCT_TYPES = [
  { id: 1, title: 'Поштучно/Ингридиент' },
  { id: 2, title: 'Тех.карта/Приготовление' },
];

const initValues = {
  name: '',
  productType: PRODUCT_TYPES[0].title,
  category: '--',
  inSale: true,
  quantity: null,
  unit: 'шт.',
  minQuantity: null,
  netCost: null,
  marginPrice: null,
  price: null,
  compositions: {
    compositionName: null,
  },
};

const unitValues = [
  { id: 1, title: 'шт.' },
  { id: 2, title: 'кг.' },
  { id: 3, title: 'гр.' },
  { id: 4, title: 'л.' },
];

export const modalStyles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    minWidth: 1000,
    '.MuiTextField-root': {
      maxWidth: '30ch',
      margin: '10px 0',
    },
    '.MuiFormControl-root': {
      width: '30ch',
    },
  },
  divider: {
    m: '5px 0',
  },
  calculatePrice: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '100%',
    backgroundColor: '#e3f2fd',
    padding: '10px',
    alignItems: 'flex-end',
    gap: '20px',
  },
  buttons: {
    display: 'flex',
    gap: 2,
  },
};

const initComposition = {
  compostionName: '',
  ingridients: [
    {
      name: '',
      count: null,
      brutto: 0,
      netto: 0,
      price: null,
      summ: 0.0,
    },
  ],
};

const EditProductModal = ({ open, setOpen, currentProduct }) => {
  const [initState, setInitState] = useState({ ...initValues });
  const [initComposition, setInitComposition] = useState({ ...initValues });

  useEffect(() => {
    if (currentProduct) {
      setInitState(currentProduct[0]);
    }
  }, [currentProduct]);

  const handleInputs = (e) => {
    setInitState({
      ...initState,
      [e.target.name]: e.target.value,
    });
  };

  const handleComposition = (e) => {
    setInitComposition({
      ...initComposition,
      [e.target.name]: e.target.value,
    });
  };

  const toggleModal = () => setOpen(false);

  const handleChangePrice = (e) => {
    setInitState({
      ...initState,
      [e.target.name]: e.target.value,
      marginPrice: ((+(initState.price - e.target.value) / e.target.value) * 100).toFixed(
        2,
      ),
    });
  };

  const handlePercent = (e) => {
    setInitState({
      ...initState,
      [e.target.name]: e.target.value,
      price: +((initState.netCost / 100) * e.target.value + +initState.netCost).toFixed(
        2,
      ),
    });
  };

  const handleSalePrice = (e) => {
    setInitState({
      ...initState,
      [e.target.name]: e.target.value,
      marginPrice: (
        (+(e.target.value - initState.netCost) / initState.netCost) *
        100
      ).toFixed(2),
    });
  };

  const handleAddNewProduct = () => {
    if (!initState.name) {
      return;
    }

    instance
      .post('dashboard/products', {
        ...initState,
      })
      .catch((err) => console.log(err));
  };
  return (
    <Controls.BasicModal modalTitle={'Карточка'} open={open} setOpen={toggleModal}>
      <Box sx={modalStyles.wrapper}>
        <Controls.RadioGroup
          name={'productType'}
          label={'Тип товара'}
          value={initState.productType}
          onChange={handleInputs}
          items={PRODUCT_TYPES}
        />
        <Controls.Input
          name={'name'}
          label={NAME_LABEL}
          value={initState.name}
          onChange={handleInputs}
        />
        <Divider sx={modalStyles.divider} />
        <Controls.Select
          name={'category'}
          value={initState.category}
          label={CATEGORIES_LABEL}
          onChange={handleInputs}
          options={CATEGORIES_ARRAY}
        />
        <Controls.Checkbox
          name={'inSale'}
          label={IN_SALE_CHECKBOX_LABEL}
          value={initState.inSale}
          onChange={handleInputs}
        />
        <Divider sx={modalStyles.divider} />
        <Controls.Input
          name={'quantity'}
          type={'Number'}
          label={QUANTITY_LABEL}
          value={initState.quantity}
          onChange={handleInputs}
        />
        <Controls.Select
          name={'unit'}
          label={UNIT_VALUE_LABEL}
          value={initState.unit}
          onChange={handleInputs}
          options={unitValues}
        />
        <Controls.Input
          name={'minQuantity'}
          type={'Number'}
          label={MIN_QUANTITY_LABEL}
          value={initState.minQuantity}
          onChange={handleInputs}
        />

        <Box sx={modalStyles.calculatePrice}>
          <Controls.Input
            name={'netCost'}
            type={'Number'}
            label={NET_COST}
            value={initState.netCost}
            onChange={handleChangePrice}
            endAdornment={'₴'}
          />
          <Controls.Input
            name={'marginPrice'}
            type={'Number'}
            label={MARGIN_PERCENT}
            value={initState.marginPrice}
            onChange={handlePercent}
            endAdornment={'%'}
          />
          <Controls.Input
            name={'price'}
            type={'Number'}
            label={PRICE}
            value={initState.price}
            onChange={handleSalePrice}
            endAdornment={'₴'}
          />
        </Box>

        <Box name={'compositions'} sx={modalStyles.wrapper}>
          <Divider sx={modalStyles.divider} />
          <Typography variant={'h5'}>Составы</Typography>
          <Controls.Button text={'Добавить состав'} />

          <CompositionTable />
        </Box>

        <Box sx={modalStyles.buttons}>
          <Controls.Button variant="contained" color="error" text={'Удалить'} />
          <Controls.Button
            variant="contained"
            color="primary"
            onClick={handleAddNewProduct}
            text={'Сохранить'}
          />
        </Box>
      </Box>
    </Controls.BasicModal>
  );
};

export default EditProductModal;
