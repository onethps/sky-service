import { ProductType } from 'features/ProductsPage/bll/types';
import { modProductType } from 'features/ProductsPage/ui/TechCard/types';
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

export const generateNewProductField = (): ProductType => {
  return {
    productId: uuidv4(),
    name: '',
    quantity: 0,
    unit: 'шт',
    price: 0,
    sum: 0,
    netPrice: 0,
    productType: 'one',
    category: '--',
    inSale: true,
    marginPrice: 0,
    minQuantity: 0,
    weight: '',
    mod: [],
  };
};
