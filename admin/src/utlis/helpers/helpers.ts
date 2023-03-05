import { modProductType } from 'features/ProductsPage/types/types';
import { IProduct, UnitType } from 'interfaces/product.interfaces';
import { v4 as uuidv4 } from 'uuid';

export const calcNetValuePerPortion = (array: any[]) => {
  return array.reduce((acc: number, el: modProductType) => {
    acc += el.summ;
    return acc;
  }, 0);
};

export const calcNetValuePerHungeredGram = (array: any[]) => {
  return array.reduce((acc: number, el: modProductType) => {
    acc += (el.price / 1000) * 100;
    return acc;
  }, 0);
};

export const generateNewProductField = (): IProduct => {
  return {
    id: uuidv4(),
    name: '',
    unit: 'шт' as UnitType,
    type: 'one' as const,
    price: 0,
    category: '--',
    saleStatus: true,
    percent: 0,
    quantity: 0,
    minQuantity: 0,
    weight: '',
    modIds: [],
  };
};
