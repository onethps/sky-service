import { Box, Divider, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { instance } from '../../../api/config';
import Controls from '../../../components/Controls';
import CompositionTable from '../CompostionTable/CompositionTable';
import {
  CATEGORIES_ARRAY,
  CATEGORIES_LABEL,
  IN_SALE_CHECKBOX_LABEL,
  NAME_LABEL,
  UNIT_VALUE_LABEL,
  unitValues,
  QUANTITY_LABEL,
  MIN_QUANTITY_LABEL,
  NET_COST,
  PRICE,
  MARGIN_PERCENT,
  COMPOSITION_NAME,
} from './costants';
import { modalStyles } from './styles';

const PRODUCT_TYPES = [
  { id: 1, title: 'Поштучно/Ингридиент' },
  { id: 2, title: 'Тех.карта/Приготовление' },
];

const initDefaultValues = {
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
};

const initNewIngredient = {
  id: uuidv4(),
  name: '',
  priceForPortion: 0,
  price: '',
  marginPricePercent: 0,
  ingredients: [
    {
      id: uuidv4(),
      name: '',
      count: '',
      brutto: 0,
      netto: 0,
      price: 0,
      summ: 0.0,
    },
  ],
};

const EditProductModal = ({ open, setOpen, currentProduct }) => {
  const [initState, setInitState] = useState({ ...initDefaultValues });
  const [initIngredientsState, setInitIngredientsState] = useState([
    {
      ...initNewIngredient,
    },
  ]);
  const toggleModal = () => setOpen(false);

  // const availableIngredients = currentProduct[0].category === PRODUCT_TYPES[1].title;

  useEffect(() => {
    if (currentProduct) {
      setInitState(currentProduct[0]);
      // if (availableIngredients) {
      //   // fetching ingredients
      // }
    }
  }, [currentProduct]);

  const handleInputs = (e) => {
    setInitState({
      ...initState,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewIngredient = () => {
    setInitIngredientsState([
      ...initIngredientsState,
      {
        ...initNewIngredient,
        id: uuidv4(),
      },
    ]);
  };

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

  const removeIngredientsTable = (id) => {
    setInitIngredientsState(initIngredientsState.filter((el) => el.id !== id));
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
          {initIngredientsState.map((ingredient) => (
            <CompositionTable
              key={ingredient.id}
              initIngredients={ingredient}
              removeIngredientsTable={removeIngredientsTable}
              id={ingredient.id}
            />
          ))}

          <Controls.Button onClick={handleNewIngredient} text={'Добавить состав'} />
        </Box>
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
    </Controls.BasicModal>
  );
};

export default EditProductModal;
