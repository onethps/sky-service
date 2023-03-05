export type CategoryType = 'one' | 'mod';
export type UnitType = 'шт' | 'кг' | 'гр' | 'л' | 'мл';
export type UnitPriceType = 'portion' | '100 гр' | '100 мл';

export interface IProduct {
  id: string;
  name: string;
  type: CategoryType;
  category: string;
  saleStatus: boolean;
  price: number;
  percent: number;
  quantity: number;
  minQuantity: number;
  unit: UnitType;
  weight: string;
  modIds: string[];
}

export interface IModProduct {
  id: string;
  productId: string;
  ingredients: IIngredient[];
  name: string;
  typeMod: UnitPriceType;
}

export interface IIngredient {
  name: string;
  quantity: number;
  netto: number;
}
