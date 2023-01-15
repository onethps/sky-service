import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Controls } from 'components';
import { TechCard } from 'pages/Products/TechCard/TechCard';
import { TechCardType } from 'pages/Products/TechCard/types';
import { EDIT_PRODUCT_TYPES, PRODUCT_TYPES, ProductType } from 'pages/Products/types';
import { useDispatch } from 'react-redux';
import { addProduct } from 'store/reducers/products';
import { v4 as uuidv4 } from 'uuid';

import { Box, Divider, SelectChangeEvent, Typography } from '@mui/material';

import {
  CATEGORIES_ARRAY,
  CATEGORIES_LABEL,
  IN_SALE_CHECKBOX_LABEL,
  MARGIN_PERCENT,
  MIN_QUANTITY_LABEL,
  NAME_LABEL,
  NET_COST,
  PRICE,
  QUANTITY_LABEL,
  UNIT_VALUE_LABEL,
  unitValues,
} from './costants';
import { modalStyles } from './styles';

const initProduct: ProductType = {
  productId: uuidv4(),
  name: '',
  productType: PRODUCT_TYPES[0].title,
  category: '--',
  inSale: true,
  quantity: 0,
  unit: 'шт.',
  minQuantity: 0,
  netPrice: 0,
  marginPrice: 0,
  price: 0,
  mod: [],
};

const initTechCard: TechCardType = {
  productId: '',
  modName: '',
  id: uuidv4(),
  tablesMod: [
    { id: uuidv4(), name: null, quantity: 0, bruto: 0, neto: 0, price: 0, summ: 0 },
  ],
  categoryPerPriceMod: 'Порцію',
  netPriceMod: 0,
  priceMod: 0,
  marginPricePercentMod: 0,
};

interface EditProductModalType {
  open: boolean;
  setOpen: (el: boolean) => void;
  currentProduct: ProductType | null;
}

const EditProductModal: FC<EditProductModalType> = ({
  open,
  setOpen,
  currentProduct,
}) => {
  const [initProductCardState, setInitProductCardState] = useState<ProductType>({
    ...initProduct,
  });

  const [initTechCardList, setInitTechCardList] = useState<TechCardType[]>([
    { ...initTechCard },
  ]);

  const dispatch = useDispatch();
  const isTechCardCategory = initProductCardState.productType === PRODUCT_TYPES[1].title;
  const toggleModal = () => setOpen(false);

  const removeTechCard = (id: string) => {
    setInitTechCardList(initTechCardList.filter((el) => el.id !== id));
  };

  const addNewTechCard = () => {
    setInitTechCardList([...initTechCardList, { ...initTechCard, id: uuidv4() }]);
  };

  const handleInputs = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<any>,
  ) => {
    setInitProductCardState({
      ...initProductCardState,
      [event.target.name]: Number(event.target.value)
        ? +event.target.value
        : event.target.value,
    });
  };

  const handleChangeNetPrice = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const price = Number(initProductCardState.price);
    const netPrice = Number(e.target.value);
    const calculateNetPrice: number = +(((price - netPrice) / netPrice) * 100).toFixed(2);

    setInitProductCardState({
      ...initProductCardState,
      [e.target.name]: e.target.value,
      marginPrice: calculateNetPrice,
    });
  };

  const handleChangePercentPrice = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const percent = Number(event.target.value);
    const netPrice = Number(initProductCardState.netPrice);

    const calculatePercent: number = +((netPrice / 100) * percent + netPrice).toFixed(2);

    setInitProductCardState({
      ...initProductCardState,
      [event.target.name]: event.target.value,
      price: calculatePercent,
    });
  };

  const handleChangeMarginPrice = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const marginPrice = Number(event.target.value);
    const netCost = Number(initProductCardState.netPrice);
    const calculateMarginPrice: number = +(
      ((marginPrice - netCost) / netCost) *
      100
    ).toFixed(2);

    setInitProductCardState({
      ...initProductCardState,
      [event.target.name]: event.target.value,
      marginPrice: calculateMarginPrice,
    });
  };

  const handleAddNewProduct = () => {
    if (!initProductCardState.name) {
      return;
    }
    if (isTechCardCategory) {
      dispatch(
        addProduct({
          product: { ...initProductCardState, mod: [...initTechCardList] },
        }) as any,
      );
    } else {
      dispatch(addProduct({ product: initProductCardState }) as any);
    }
    setOpen(false);
  };

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    const check = event.target.checked;
    setInitProductCardState({
      ...initProductCardState,
      [event.target.name]: check,
    });
  };

  useEffect(() => {
    if (!currentProduct) {
      setInitProductCardState({
        ...initProduct,
      });
      return;
    }

    setInitProductCardState(currentProduct);
  }, [currentProduct]);

  return (
    <Controls.BasicModal modalTitle={'Карточка'} open={open} setOpen={toggleModal}>
      <Box sx={modalStyles.wrapper}>
        <Controls.RadioGroup
          name={'productType'}
          label={'Тип товара'}
          value={initProductCardState.productType}
          onChange={handleInputs}
          items={EDIT_PRODUCT_TYPES}
          errorMessage={false}
        />
        <Controls.Input
          name={'name'}
          label={NAME_LABEL}
          value={initProductCardState.name}
          onChange={handleInputs}
          error={!initProductCardState.name}
        />
        <Divider sx={modalStyles.divider} />
        <Controls.Select
          name={'category'}
          value={initProductCardState.category}
          label={CATEGORIES_LABEL}
          onChange={handleInputs}
          options={CATEGORIES_ARRAY}
        />
        <Controls.Checkbox
          name={'inSale'}
          label={IN_SALE_CHECKBOX_LABEL}
          onChange={handleCheckBox}
          value={initProductCardState.inSale}
          checked={initProductCardState.inSale}
        />

        {isTechCardCategory ? (
          <Box sx={modalStyles.wrapper}>
            <Divider sx={modalStyles.divider} />
            <Typography variant={'h5'}>Составы</Typography>
            {initTechCardList.map((el: TechCardType, index) => (
              <TechCard
                key={el.id}
                currentTechCard={el}
                techIndex={index}
                initTechCardList={initTechCardList}
                setInitTechCardList={setInitTechCardList}
                removeTechCard={removeTechCard}
              />
            ))}
            <Controls.Button
              color={'success'}
              onClick={() => addNewTechCard()}
              text={'Добавить состав'}
            />
          </Box>
        ) : (
          <>
            <Divider sx={modalStyles.divider} />
            <Controls.Input
              name={'quantity'}
              type={'Number'}
              label={QUANTITY_LABEL}
              value={initProductCardState.quantity}
              onChange={handleInputs}
            />
            <Controls.Select
              name={'unit'}
              label={UNIT_VALUE_LABEL}
              value={initProductCardState.unit}
              onChange={handleInputs}
              options={unitValues}
            />
            <Controls.Input
              name={'minQuantity'}
              type={'Number'}
              label={MIN_QUANTITY_LABEL}
              value={initProductCardState.minQuantity}
              onChange={handleInputs}
            />
            <Box sx={modalStyles.calculatePrice}>
              <Controls.Input
                name={'netPrice'}
                type={'Number'}
                label={NET_COST}
                value={initProductCardState.netPrice}
                onChange={handleChangeNetPrice}
                endAdornment={'₴'}
              />
              <Controls.Input
                name={'marginPrice'}
                type={'Number'}
                label={MARGIN_PERCENT}
                value={initProductCardState.marginPrice}
                onChange={handleChangePercentPrice}
                endAdornment={'%'}
              />
              <Controls.Input
                name={'price'}
                type={'Number'}
                label={PRICE}
                value={initProductCardState.price}
                onChange={handleChangeMarginPrice}
                endAdornment={'₴'}
              />
            </Box>
          </>
        )}

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
