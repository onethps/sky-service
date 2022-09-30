import { Box, Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { instance } from '../../../api/config';
import Controls from '../../../components/Controls';

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

const PRODUCT_TYPES = [
  { id: 1, title: 'Поштучно/Ингридиент' },
  { id: 2, title: 'Тех.карта/Приготовление' },
];

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

const EditProductModal = ({ open, setOpen }) => {
  const [fields, setFields] = useState({
    name: null,
    productType: PRODUCT_TYPES[0].title,
    category: '--',
    inSale: true,
    quantity: null,
    unit: 'шт.',
    minQuantity: null,
    netCost: null,
    marginPrice: null,
    price: null,
  });

  const handleInputs = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const toggleModal = () => setOpen(false);

  const handleChangePrice = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
      marginPrice: ((+(fields.price - e.target.value) / e.target.value) * 100).toFixed(2),
    });
  };

  const handlePercent = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
      price: +((fields.netCost / 100) * e.target.value + +fields.netCost).toFixed(2),
    });
  };

  const handleSalePrice = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
      marginPrice: ((+(e.target.value - fields.netCost) / fields.netCost) * 100).toFixed(
        2,
      ),
    });
  };

  const handleAddNewProduct = () => {
    if (!fields.name) {
      return;
    }

    instance
      .post('dashboard/products', {
        ...fields,
      })
      .catch((err) => console.log(err));
  };
  return (
    <Controls.BasicModal modalTitle={'Карточка'} open={open} setOpen={toggleModal}>
      <Box sx={modalStyles.wrapper}>
        <Controls.RadioGroup
          name={'productType'}
          label={'Тип товара'}
          value={fields.productType}
          onChange={handleInputs}
          items={PRODUCT_TYPES}
        />
        <Controls.Input
          name={'name'}
          label={NAME_LABEL}
          value={fields.name}
          onChange={handleInputs}
        />
        <Divider sx={modalStyles.divider} />
        <Controls.Select
          name={'category'}
          value={fields.category}
          label={CATEGORIES_LABEL}
          onChange={handleInputs}
          options={CATEGORIES_ARRAY}
        />
        <Controls.Checkbox
          name={'inSale'}
          label={IN_SALE_CHECKBOX_LABEL}
          value={fields.inSale}
          onChange={handleInputs}
        />
        <Divider sx={modalStyles.divider} />
        <Controls.Input
          name={'quantity'}
          label={QUANTITY_LABEL}
          value={fields.quantity}
          onChange={handleInputs}
        />
        <Controls.Select
          name={'unit'}
          label={UNIT_VALUE_LABEL}
          value={fields.unit}
          onChange={handleInputs}
          options={unitValues}
        />
        <Controls.Input
          name={'minQuantity'}
          label={MIN_QUANTITY_LABEL}
          value={fields.minQuantity}
          onChange={handleInputs}
        />

        <Box sx={modalStyles.calculatePrice}>
          <Controls.Input
            name={'netCost'}
            label={NET_COST}
            value={fields.netCost}
            onChange={handleChangePrice}
            endAdornment={'₴'}
          />
          <Controls.Input
            name={'marginPrice'}
            label={MARGIN_PERCENT}
            value={fields.marginPrice}
            onChange={handlePercent}
            endAdornment={'%'}
          />
          <Controls.Input
            name={'price'}
            label={PRICE}
            value={fields.price}
            onChange={handleSalePrice}
            endAdornment={'₴'}
          />
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
