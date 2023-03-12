import { IShop } from 'features/HomePage/bll/shopSlice';
import { instance } from 'services/config';

export const SHOP_API = {
  getShopData(userId: string) {
    return instance.get<IShop>(`/store/find/${userId}`);
  },
};
