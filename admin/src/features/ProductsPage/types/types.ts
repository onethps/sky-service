export type TechCardType = {
  productId: string;
  modName: string;
  id: string;
  tablesMod: modProductType[];
  categoryPerPriceMod: string;
  netPriceMod: number;
  priceMod: number;
  marginPricePercentMod: number;
};

export type modProductType = {
  id: string;
  name: string | null;
  quantity: number;
  bruto: number;
  neto: number;
  price: number;
  summ: number;
};
