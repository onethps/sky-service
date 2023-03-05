import { ChangeEvent, FC, useEffect, useState } from 'react';
import { addProduct, updateProduct } from 'features/ProductsPage/bll/middleware/products';
import { EDIT_PRODUCT_TYPES, PRODUCT_TYPES } from 'features/ProductsPage/bll/types';
import { TechCard } from 'features/ProductsPage/components/TechCard';
import { TechCardType } from 'features/ProductsPage/types/types';
import { IProduct } from 'interfaces/product.interfaces';
import { CustomRadioGroup } from 'shared/components/CustomRadioGroup/CustomRadioGroup';
import { CustomSelect } from 'shared/components/CustomSelect/CustomSelect';
import { ModalWrapper } from 'shared/components/ModalWrapper/ModalWrapper';
import { useAppDispatch } from 'shared/hooks/redux-hooks';
import { generateNewProductField } from 'utlis/helpers';
import { v4 as uuidv4 } from 'uuid';

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  SelectChangeEvent,
  TextField,
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
} from '../constants/constants';
import { modalStyles } from '../styles/styles';

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

interface EditProductModalProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  currentProduct: IProduct | null;
}

type ProductTypeWithFields = IProduct & { marginPrice: number };

const EditProductModal: FC<EditProductModalProps> = ({
  open,
  setOpen,
  currentProduct,
}) => {
  const dispatch = useAppDispatch();

  const [initProductCardState, setInitProductCardState] = useState<ProductTypeWithFields>(
    { ...generateNewProductField(), marginPrice: 0 },
  );

  const [initTechCardList, setInitTechCardList] = useState<TechCardType[]>([
    { ...initTechCard },
  ]);

  const isTechCardCategory = initProductCardState.type === 'mod';

  const toggleModal = () => setOpen(false);

  const removeTechCard = (id: string) => {
    setInitTechCardList(initTechCardList.filter((techCard) => techCard.id !== id));
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
        ? Number(event.target.value)
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
      [e.target.name]: Number(e.target.value),
      marginPrice: calculateNetPrice,
    });
  };

  const handleChangePercentPrice = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const percent = Number(event.target.value);
    const netPrice = Number(initProductCardState.price);

    const calculatePercent: number = +((netPrice / 100) * percent + netPrice).toFixed(2);

    setInitProductCardState({
      ...initProductCardState,
      [event.target.name]: Number(event.target.value),
      price: calculatePercent,
    });
  };

  const handleChangeMarginPrice = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const marginPrice = Number(event.target.value);
    const netCost = Number(initProductCardState.price);
    const calculateMarginPrice: number = +(
      ((marginPrice - netCost) / netCost) *
      100
    ).toFixed(2);

    setInitProductCardState({
      ...initProductCardState,
      [event.target.name]: Number(event.target.value),
      marginPrice: calculateMarginPrice,
    });
  };

  const handleAddNewProduct = () => {
    if (!initProductCardState.name) {
      return;
    }
    if (isTechCardCategory) {
      return;
      // TODO:// FIX FETCHING WITH ISTECHCARD
      // dispatch(
      //   addProduct({
      //     product: { ...initProductCardState, mod: [...initTechCardList] },
      //   }),
      // );
    } else {
      dispatch(addProduct({ product: initProductCardState }));
    }
    setOpen(false);
  };

  const handleUpdateProduct = () => {
    console.log('update PD', initProductCardState);
    dispatch(
      updateProduct({ id: initProductCardState.id!, product: initProductCardState }),
    );
  };

  const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
    const check = event.target.checked;
    setInitProductCardState({
      ...initProductCardState,
      [event.target.name]: check,
    });
  };

  // useEffect(() => {
  //   if (!currentProduct) {
  //     setInitProductCardState({ ...generateNewProductField(), marginPrice: 0 });
  //     return;
  //   }

  //   setInitProductCardState(currentProduct);
  // }, [currentProduct]);

  return (
    <ModalWrapper modalTitle="Карточка" open={open} setOpen={toggleModal}>
      <Box sx={modalStyles.wrapper}>
        <CustomRadioGroup
          name="productType"
          value={initProductCardState.type}
          radioItems={EDIT_PRODUCT_TYPES}
          onChange={handleInputs}
        />
        <TextField
          label={NAME_LABEL}
          name={'name'}
          value={initProductCardState.name}
          onChange={handleInputs}
          error={!initProductCardState.name}
        />
        <Divider sx={modalStyles.divider} />
        <CustomSelect
          name="category"
          value={initProductCardState.category}
          label={CATEGORIES_LABEL}
          menuItems={CATEGORIES_ARRAY}
        />
        <FormControlLabel
          label={IN_SALE_CHECKBOX_LABEL}
          control={
            <Checkbox
              value={initProductCardState.saleStatus}
              checked={initProductCardState.saleStatus}
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
            <TextField
              label={QUANTITY_LABEL}
              name={'quantity'}
              value={initProductCardState.quantity}
              onChange={handleInputs}
            />

            <CustomSelect
              name="unit"
              value={initProductCardState.unit}
              onChange={handleInputs}
              label={UNIT_VALUE_LABEL}
              menuItems={unitValues}
            />
            <TextField
              label={MIN_QUANTITY_LABEL}
              name={'minQuantity'}
              value={initProductCardState.minQuantity}
              onChange={handleInputs}
            />

            <Box sx={modalStyles.calculatePrice}>
              <TextField
                label={NET_COST}
                name={'netPrice'}
                value={initProductCardState.price}
                onChange={handleChangeNetPrice}
                InputProps={{
                  endAdornment: '₴',
                  type: 'number',
                }}
              />

              <TextField
                label={MARGIN_PERCENT}
                name={'marginPrice'}
                type={'number'}
                value={initProductCardState.marginPrice}
                onChange={handleChangePercentPrice}
                InputProps={{
                  endAdornment: '%',
                }}
              />
              <TextField
                label={PRICE}
                name={'price'}
                type={'number'}
                value={initProductCardState.price}
                onChange={handleChangeMarginPrice}
                InputProps={{
                  endAdornment: '₴',
                }}
              />
            </Box>
          </>
        )}

        <Box sx={modalStyles.buttons}>
          <Button fullWidth variant="contained" color="error">
            Удалить
          </Button>
          <Button
            fullWidth
            onClick={handleUpdateProduct}
            color="primary"
            variant="contained"
          >
            Сохранить
          </Button>
        </Box>
      </Box>
    </ModalWrapper>
  );
};

export default EditProductModal;
