export type TechCardType = {
  _id: string;
  productId: string;
  modName: string;
  modTables: modTableType[];
  priceForPortion: number;
  netPrice: number;
  price: number;
  marginPricePercent: number;
};

export type modTableType = {
  id: string;
  name: string;
  count: number;
  brutto: number;
  netto: number;
  price: number;
  summ: number;
};
