import { modProductType } from 'pages/Products/TechCard/types';

export const calcNetValuePerPortion = (array: any[]) => {
  return array.reduce((acc: number, el: modProductType) => {
    acc += el.summ;
    return acc;
  }, 0);
};

export const calcNetValuePerHungeredGram = (array: any[]) => {
  return array.reduce((acc: number, el: modProductType) => {
    acc += (el.price / 1000) * 100;
    return acc;
  }, 0);
};
