export const debitMoneyOptions = [
  {
    id: '1',
    value: 'yes',
    label: 'Да',
  },
  {
    id: '2',
    value: 'no',
    label: 'Нет',
  },
];

export const optionsForSpendCategory = [{ id: '1', value: 'Приход товара' }];

export const unitOptions = [
  { id: '1', value: 'kg' },
  { id: '2', value: 'шт.' },
];

export type WalletOptionsType = {
  id: string;
  value: string;
};

export const walletOptions = [
  { id: '1', value: 'Нет' },
  { id: '2', value: 'Выбрать счет' },
];
