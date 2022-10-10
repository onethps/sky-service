export type TechCardType = {
  _id: string;
  productId: string;
  modName: string;
  modTables: modTableType[];
  priceForPortion: string;
  netPrice: string;
  price: string;
  marginPricePercent: string;
};

export type modTableType = {
  id: string;
  name: string;
  count: string;
  brutto: string;
  netto: string;
  price: string;
  summ: string;
};
