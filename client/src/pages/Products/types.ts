export interface ProductType {
  _id?: string;
  createdAt?: string;
  name: string;
  productType: string;
  category: string;
  inSale: number;
  netCost: string;
  marginPrice: string;
  price: string;
  quantity: string;
  unit: string;
  minQuantity: string;
}
export const PRODUCT_TYPES = [
  { id: 1, title: 'Поштучно/Ингридиент' },
  { id: 2, title: 'Тех.карта/Приготовление' },
];
