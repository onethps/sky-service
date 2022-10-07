import { Box, Divider, SelectChangeEvent, Typography } from '@mui/material';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Controls from '../../../components/Controls';
import TechCard from '../TechCard/TechCard';
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
import { instance } from 'api/config';
import { ProductType } from 'pages/Products/types';
import { useDispatch } from 'react-redux';
import { addProduct } from 'store/reducers/products';

const PRODUCT_TYPES = [
  { id: 1, title: 'Поштучно/Ингридиент' },
  { id: 2, title: 'Тех.карта/Приготовление' },
];

const initDefaultValues: ProductType = {
  name: '',
  productType: PRODUCT_TYPES[0].title,
  category: '--',
  inSale: 0,
  quantity: '',
  unit: 'шт.',
  minQuantity: '',
  netCost: 0,
  marginPrice: '',
  price: '',
};

const initTechCardState: TechCardType = {
  productCardId: '',
  id: '',
  name: '',
  priceForPortion: 0,
  price: 0,
  marginPricePercent: 0,
  techCardTable: [
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

export type TechCardType = {
  productCardId: string;
  id: string;
  name: string;
  priceForPortion: number;
  price: number;
  marginPricePercent: number;
  techCardTable: TechCardTable[];
};

export type TechCardTable = {
  id: string;
  name: string;
  count: string;
  brutto: number;
  netto: number;
  price: number;
  summ: number;
};

type EditProductModalType = {
  open: boolean;
  setOpen: (el: boolean) => void;
  currentProduct: ProductType | null;
};

const EditProductModal: FC<EditProductModalType> = ({
  open,
  setOpen,
  currentProduct,
}) => {
  const [initProductCardState, setInitProductCardState] = useState<ProductType>({
    ...initDefaultValues,
  });

  const [techCardsList, setTechCardsList] = useState([{ ...initTechCardState }]);

  const isTechCardCategory = initProductCardState.productType === PRODUCT_TYPES[1].title;

  useEffect(() => {
    if (currentProduct) {
      setInitProductCardState(currentProduct);
      return;
    }

    setInitProductCardState({
      ...initDefaultValues,
    });
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

  const handleNewTechCard = () => {
    if (!isTechCardCategory) return;
    // setTechCardsList([
    //   ...techCardsList,
    //   {
    //     ...initTechCardState,
    //     productCardId: currentProduct?._id,
    //     id: uuidv4(),
    //   },
    // ]);
  };

  const handleChangeNetPrice = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const price: number = Number(initProductCardState.price);
    const netPrice: number = Number(e.target.value);
    const calculateNetPrice: string = (((price - netPrice) / netPrice) * 100).toFixed(2);

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

    const calculatePercent: string = ((netCost / 100) * percent + netCost).toFixed(2);

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
    const calculateMarginPrice: string = (
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

    dispatch(addProduct({ product: initProductCardState }) as any);
  };

  const removeTechCard = (id: string) => {
    setTechCardsList(techCardsList.filter((el) => el.id !== id));
  };

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    const check = event.target.checked;
    setInitProductCardState({
      ...initProductCardState,
      [event.target.name]: check ? 1 : 0,
    });
    console.log(initProductCardState);
  };
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
            maxWidth={'50px'}
            label={NET_COST}
            value={initProductCardState.netCost}
            onChange={handleChangeNetPrice}
            endAdornment={'₴'}
          />
          <Controls.Input
            name={'marginPrice'}
            type={'Number'}
            maxWidth={'50px'}
            label={MARGIN_PERCENT}
            value={initProductCardState.marginPrice}
            onChange={handleChangePercentPrice}
            endAdornment={'%'}
          />
          <Controls.Input
            name={'price'}
            type={'Number'}
            maxWidth={'50px'}
            label={PRICE}
            value={initProductCardState.price}
            onChange={handleChangeMarginPrice}
            endAdornment={'₴'}
          />
        </Box>

        {isTechCardCategory ? (
          <Box sx={modalStyles.wrapper}>
            <Divider sx={modalStyles.divider} />
            <Typography variant={'h5'}>Составы</Typography>
            {techCardsList.map((el, index) => (
              <TechCard
                key={el.id}
                techCard={el}
                techIndex={index}
                setTechCardsList={setTechCardsList}
                techCardsList={techCardsList}
                removeTechCard={() => removeTechCard(el.id)}
              />
            ))}
            <Controls.Button
              color={'success'}
              onClick={handleNewTechCard}
              text={'Добавить состав'}
            />
          </Box>
        ) : null}

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
