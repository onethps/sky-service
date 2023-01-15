import { ProductType } from '../bll/types';

export interface INewCardFields {
  disablePadding: boolean;
  _id: keyof ProductType;
  label: string;
  numeric: boolean;
}
