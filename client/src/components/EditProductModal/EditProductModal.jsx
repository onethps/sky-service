import { Box, Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import Controls from '../Controls';

const PRODUCT_TYPES = [
  { id: 1, title: 'Поштучно/Ингридиент' },
  { id: 2, title: 'Тех.карта/Приготовление' },
];

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
  const [price, setPrice] = useState(null);
  const [marginPricePercent, setMarginPricePercent] = useState(null);
  const [salePrice, setSalePrice] = useState(null);

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
    setMarginPricePercent(
      ((+(salePrice - e.target.value) / e.target.value) * 100).toFixed(2),
    );
  };

  const handlePercent = (e) => {
    setMarginPricePercent(e.target.value);
    setSalePrice(+((price / 100) * e.target.value + +price).toFixed(2));
  };

  const handleSalePrice = (e) => {
    setSalePrice(e.target.value);
    setMarginPricePercent(((+(e.target.value - price) / price) * 100).toFixed(2));
  };

  const [productType, setProductType] = useState(PRODUCT_TYPES[0].title);
  const [currentCategory, setCurrentCategory] = useState(CATEGORIES_ARRAY[0].title);
  const [inSaleCheckBox, setInSaleCheckBox] = useState(true);

  const [quantity, setQuantity] = useState(null);
  const [unitValue, setUnitValue] = useState(null);
  const [minQuantity, setMinQuantity] = useState(null);

  const handleQuantity = (e) => setQuantity(e.currentTarget.value);
  const handleUnitValue = (e) => setUnitValue(e.currentTarget.value);
  const handleMinQuantity = (e) => setMinQuantity(e.currentTarget.value);

  const handleProductType = (e) => setProductType(e.currentTarget.value);
  const handleCategoryType = (e) => setCurrentCategory(e.currentTarget.value);
  const handleInSaleCheckBox = () => setInSaleCheckBox(!inSaleCheckBox);

  const toggleModal = () => setOpen(false);

  return (
    <Controls.BasicModal modalTitle={'Карточка'} open={open} setOpen={toggleModal}>
      <Box sx={modalStyles.wrapper}>
        <Controls.RadioGroup
          name={'product_type'}
          label={'Тип товара'}
          value={productType}
          onChange={handleProductType}
          items={PRODUCT_TYPES}
        />
        <TextField
          id="filled-search"
          label={NAME_LABEL}
          type="search"
          variant="outlined"
        />
        <Divider sx={modalStyles.divider} />
        <Controls.Select
          name={'catergories'}
          value={currentCategory}
          label={CATEGORIES_LABEL}
          onChange={handleCategoryType}
          options={CATEGORIES_ARRAY}
        />
        <Controls.Checkbox
          name={'in-sale-status'}
          label={IN_SALE_CHECKBOX_LABEL}
          value={inSaleCheckBox}
          onChange={handleInSaleCheckBox}
        />
        <Divider sx={modalStyles.divider} />
        <Controls.Input
          name={'QUANTITY'}
          label={QUANTITY_LABEL}
          value={quantity}
          onChange={handleQuantity}
        />
        <Controls.Select
          name={'UNIT_VALUE'}
          label={UNIT_VALUE_LABEL}
          value={unitValue}
          onChange={handleUnitValue}
          options={unitValues}
        />
        <Controls.Input
          name={'MIN_QUANTITY'}
          label={MIN_QUANTITY_LABEL}
          value={minQuantity}
          onChange={handleMinQuantity}
        />

        <Box sx={modalStyles.calculatePrice}>
          <Controls.Input
            name={'NET_COST'}
            label={NET_COST}
            value={price}
            onChange={handleChangePrice}
            endAdornment={'₴'}
          />
          <Controls.Input
            name={'MARGIN_PERCENT'}
            label={MARGIN_PERCENT}
            value={marginPricePercent}
            onChange={handlePercent}
            endAdornment={'%'}
          />
          <Controls.Input
            name={'PRICE'}
            label={PRICE}
            value={salePrice}
            onChange={handleSalePrice}
            endAdornment={'₴'}
          />
        </Box>

        <Box sx={modalStyles.buttons}>
          <Controls.Button variant="contained" color="error" text={'Удалить'} />
          <Controls.Button variant="contained" color="primary" text={'Сохранить'} />
        </Box>
      </Box>
    </Controls.BasicModal>
  );
};

export default EditProductModal;
