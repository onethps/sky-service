import { instance } from 'api/config';
import { ProductType } from 'pages/Products/types';
import { TechCardType } from '../pages/Products/TechCard/types';

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
