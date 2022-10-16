import { Box, Divider, SelectChangeEvent, Typography } from '@mui/material';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Controls } from '../../../components/';

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
import { useDispatch } from 'react-redux';
import { addProduct } from 'store/reducers/products';
import { PRODUCT_TYPES, ProductType } from 'pages/Products/types';
import { TechCard } from 'pages/Products/TechCard/TechCard';
import { TechCardType } from 'pages/Products/TechCard/types';

const initProduct: ProductType = {
  _id: uuidv4(),
  name: '',
  productType: PRODUCT_TYPES[0].title,
  category: '--',
  inSale: 0,
  quantity: 0,
  unit: 'шт.',
  minQuantity: 0,
  netCost: 0,
  marginPrice: 0,
  price: 0,
};

const initTechCard = {
  _id: uuidv4(),
  productId: '',
  modName: '',
  modTables: [
    { id: uuidv4(), name: '', count: 0, brutto: 0, netto: 0, price: 0, summ: 0 },
  ],
  priceForPortion: 0,
  netPrice: 0,
  price: 0,
  marginPricePercent: 0,
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

  const [techCardsList, setTechCardsList] = useState([
    { ...initTechCard, modName: currentProduct?.name || '' },
  ]);
  const removeTechCard = (id: string) => {
    setTechCardsList(techCardsList.filter((el) => el._id !== id));
  };

  const addNewTechCard = (productId: string) => {
    const newTechCard = {
      _id: uuidv4(),
      productId: productId,
      modName: '',
      modTables: [
        { id: uuidv4(), name: '', count: 0, brutto: 0, netto: 0, price: 0, summ: 0 },
      ],
      priceForPortion: 0,
      netPrice: 0,
      price: 0,
      marginPricePercent: 0,
    };
    setTechCardsList([...techCardsList, newTechCard]);
  };

  const isTechCardCategory = initProductCardState.productType === PRODUCT_TYPES[1].title;

  useEffect(() => {
    if (!currentProduct) {
      setInitProductCardState({
        ...initProduct,
      });
      return;
    }

    setInitProductCardState(currentProduct);

    // if (isTechCardCategory) {
    //
    // }
  }, [currentProduct]);

  const toggleModal = () => setOpen(false);

  const handleInputs = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>,
  ) => {
    setInitProductCardState({
      ...initProductCardState,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeNetPrice = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const price: number = Number(initProductCardState.price);
    const netPrice: number = Number(e.target.value);
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
    const percent: number = Number(event.target.value);
    const netCost: number = Number(initProductCardState.netCost);

    const calculatePercent: number = +((netCost / 100) * percent + netCost).toFixed(2);

    setInitProductCardState({
      ...initProductCardState,
      [event.target.name]: event.target.value,
      price: calculatePercent,
    });
  };

  const handleChangeMarginPrice = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const marginPrice: number = Number(event.target.value);
    const netCost: number = Number(initProductCardState.netCost);
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

  const dispatch = useDispatch();

  const handleAddNewProduct = () => {
    if (!initProductCardState.name) {
      return;
    }

    if (isTechCardCategory) {
      let resultObj = {
        ...initProductCardState,
        netCost: 0,
        marginPrice: 0,
        price: 0,
        quantity: 0,
        unit: '',
        minQuantity: 0,
      };
    }

    dispatch(addProduct({ product: initProductCardState }) as any);
  };

  const updateProduct = (id: string, product: ProductType) => {
    dispatch(updateProduct(id, product) as any);
  };

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    const check = event.target.checked;
    setInitProductCardState({
      ...initProductCardState,
      [event.target.name]: check ? 1 : 0,
    });
  };

  useEffect(() => {}, [initProductCardState.minQuantity]);

  return (
    <Controls.BasicModal modalTitle={'Карточка'} open={open} setOpen={toggleModal}>
      <Box sx={modalStyles.wrapper}>
        <Controls.RadioGroup
          name={'productType'}
          label={'Тип товара'}
          value={initProductCardState.productType}
          onChange={handleInputs}
          items={PRODUCT_TYPES}
          errorMessage={false}
        />
        <Controls.Input
          name={'name'}
          label={NAME_LABEL}
          value={initProductCardState.name}
          onChange={handleInputs}
          error={initProductCardState.name === ''}
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
          checked={initProductCardState.inSale === 1}
        />

        {isTechCardCategory ? (
          <Box sx={modalStyles.wrapper}>
            <Divider sx={modalStyles.divider} />
            <Typography variant={'h5'}>Составы</Typography>
            {techCardsList.map((el: TechCardType, index) => (
              <TechCard
                key={el._id}
                currentTechCard={el}
                techIndex={index}
                techCardsList={techCardsList}
                setTechCardsList={setTechCardsList}
                removeTechCard={removeTechCard}
              />
            ))}
            <Controls.Button
              color={'success'}
              onClick={() => addNewTechCard(currentProduct?._id || '')}
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
                name={'netCost'}
                type={'Number'}
                label={NET_COST}
                value={initProductCardState.netCost}
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
