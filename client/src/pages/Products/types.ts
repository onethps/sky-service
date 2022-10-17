export type ProductType = {
  productId: string;
  _id?: string;
  createdAt?: string;
  name: string;
  productType: string;
  category: string;
  inSale: boolean;
  netPrice: number;
  marginPrice: number;
  price: number;
  quantity: number;
  unit: string;
  minQuantity: number;
  weight?: string;
  sum?: number;
};
export const PRODUCT_TYPES = [
  { id: 1, title: 'Поштучно/Ингридиент' },
  { id: 2, title: 'Тех.карта/Приготовление' },
];
