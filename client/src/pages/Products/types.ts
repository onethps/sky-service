export type ProductType = {
  _id?: string;
  createdAt?: string;
  name: string;
  productType: string;
  category: string;
  inSale: number;
  netCost: number;
  marginPrice: number;
  price: number;
  quantity: number;
  unit: string;
  minQuantity: number;
};
export const PRODUCT_TYPES = [
  { id: 1, title: 'Поштучно/Ингридиент' },
  { id: 2, title: 'Тех.карта/Приготовление' },
];
