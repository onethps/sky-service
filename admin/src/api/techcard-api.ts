import { instance } from 'api/config';
import { TechCardType } from 'pages/Products/TechCard/types';
import { ProductType } from 'pages/Products/types';

export const techCardsApi = {
  getTechCards(productId: string) {
    return instance.get<TechCardType[]>(`dashboard/techcards/:${productId}`);
  },
  addTechCard(data: TechCardType) {
    return instance.post<TechCardType>('dashboard/techcards/', {
      ...data,
    });
  },
};
