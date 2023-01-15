import { selectOptionsType } from 'shared/components/types';

export const unitTypes = {
  item: 'шт',
  kg: 'кг',
  gram: 'гр',
  litr: 'л',
  ml: 'мл',
};

export const arrayOfWallet: selectOptionsType[] = [
  { id: 1, title: 'Ні' },
  { id: 2, title: 'Вибрати рахунок' },
];

export const optionsForSpendCategory = [{ id: 1, title: 'Приход товара' }];

export const optionsForSaleStatus = [
  { id: 1, title: 'Да' },
  { id: 2, title: 'Нет' },
];
