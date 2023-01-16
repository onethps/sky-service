import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { addProduct } from 'features/ProductsPage/bll/middleware/products';
import {
  EDIT_PRODUCT_TYPES,
  PRODUCT_TYPES,
  ProductType,
} from 'features/ProductsPage/bll/types';
import { TechCard } from 'features/ProductsPage/ui/TechCard/TechCard';
import { TechCardType } from 'features/ProductsPage/ui/TechCard/types';
import { ProductTypes } from 'features/ProductsPage/utils/constants';
import { useAppDispatch } from 'hooks/redux-hooks';
import { ModalWrapper } from 'shared/components/ModalWrapper/ModalWrapper';
import { v4 as uuidv4 } from 'uuid';

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

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
  productType: PRODUCT_TYPES[0].title as ProductTypes,
  category: '--',
  inSale: 'yes',
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

  const dispatch = useAppDispatch();
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
        }),
      );
    } else {
      dispatch(addProduct({ product: initProductCardState }));
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
    <ModalWrapper modalTitle={'Карточка'} open={open} setOpen={toggleModal}>
      <Box sx={modalStyles.wrapper}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Тип товара</FormLabel>
          <RadioGroup
            name={'productType'}
            value={initProductCardState.productType}
            onChange={handleInputs}
          />
          {EDIT_PRODUCT_TYPES.map((type) => (
            <FormControlLabel
              key={type.label}
              value={type.title}
              control={<Radio />}
              label={type.label}
            />
          ))}
        </FormControl>
        <FormControl>
          <InputLabel>{NAME_LABEL}</InputLabel>
          <Input
            name={'name'}
            value={initProductCardState.name}
            onChange={handleInputs}
            error={!initProductCardState.name}
          />
        </FormControl>
        <Divider sx={modalStyles.divider} />
        <FormControl>
          <Select
            name={'category'}
            value={initProductCardState.category}
            label={CATEGORIES_LABEL}
            onChange={handleInputs}
          />
          {CATEGORIES_ARRAY.map((category) => (
            <MenuItem key={category.id} value={category.title}>
              {category.title}
            </MenuItem>
          ))}
        </FormControl>

        <FormControlLabel
          label={IN_SALE_CHECKBOX_LABEL}
          control={
            <Checkbox
              value={initProductCardState.inSale}
              checked={initProductCardState.inSale === 'yes'}
              onChange={handleCheckBox}
            />
          }
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
            <Button color="success" onClick={() => addNewTechCard()}>
              Добавить состав
            </Button>
          </Box>
        ) : (
          <>
            <Divider sx={modalStyles.divider} />
            <FormControl>
              <InputLabel>{QUANTITY_LABEL}</InputLabel>
              <Input
                name={'quantity'}
                type={'Number'}
                value={initProductCardState.quantity}
                onChange={handleInputs}
              />
            </FormControl>
            <FormControl>
              <Select
                name={'unit'}
                label={UNIT_VALUE_LABEL}
                value={initProductCardState.unit}
                onChange={handleInputs}
              />
              {unitValues.map((unit) => (
                <MenuItem key={unit.title} value={10}>
                  {unit.title}
                </MenuItem>
              ))}
            </FormControl>
            <FormControl>
              <InputLabel>{MIN_QUANTITY_LABEL}</InputLabel>
              <Input
                name={'minQuantity'}
                type={'Number'}
                value={initProductCardState.minQuantity}
                onChange={handleInputs}
              />
            </FormControl>
            <Box sx={modalStyles.calculatePrice}>
              <FormControl>
                <InputLabel>{NET_COST}</InputLabel>
                <Input
                  name={'netPrice'}
                  type={'Number'}
                  value={initProductCardState.netPrice}
                  onChange={handleChangeNetPrice}
                  endAdornment={'₴'}
                />
              </FormControl>
              <FormControl>
                <InputLabel>{MARGIN_PERCENT}</InputLabel>
                <Input
                  name={'marginPrice'}
                  type={'Number'}
                  value={initProductCardState.marginPrice}
                  onChange={handleChangePercentPrice}
                  endAdornment={'%'}
                />
              </FormControl>
              <FormControl>
                <InputLabel>{PRICE}</InputLabel>
                <Input
                  name={'price'}
                  type={'Number'}
                  value={initProductCardState.price}
                  onChange={handleChangeMarginPrice}
                  endAdornment={'₴'}
                />
              </FormControl>
            </Box>
          </>
        )}

        <Box sx={modalStyles.buttons}>
          <Button variant="contained" color="error">
            Видалити
          </Button>
          <Button onClick={handleAddNewProduct} color="primary" variant="contained">
            Зберегти
          </Button>
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export default EditProductModal;
