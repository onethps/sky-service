import { TechCardType } from '../ui/TechCard/types';

export type ProductType = {
  productId: string;
  _id?: string;
  createdAt?: string;
  name: string;
  productType: 'one' | 'sklad' | 'mod';
  category: string;
  inSale: 'yes' | 'no';
  netPrice: number;
  marginPrice: number;
  price: number;
  quantity: number;
  unit: string;
  minQuantity: number;
  weight?: string;
  sum?: number;
  mod: TechCardType[];
};
export const PRODUCT_TYPES = [
  { id: 1, title: 'one', label: 'Поштучно' },
  { id: 2, title: 'mod', label: 'Тех.карта' },
];

export const EDIT_PRODUCT_TYPES = [
  { id: '1', value: 'one', label: 'Поштучно/Ингридиент' },
  { id: '2', value: 'mod', label: 'Тех.карта/Состав' },
];
