import { TechCardType } from '../types/types';

// export const renderRowsWithTechCards = (products: any[]) => {
//   const res: any = [];

//   const helper = (product: TechCardType[], techCardName: string) => {
//     const res: any = [];
//     product.forEach((product) => {
//       res.push({
//         _id: product.id,
//         techCardName,
//         name: product.modName,
//         price: product.priceMod,
//         netPrice: product.netPriceMod,
//         marginPercent: product.marginPricePercentMod,
//         productType: 'sklad',
//       });
//     });
//     return res;
//   };

//   products.forEach((product) => {
//     if (product.productType === 'mod') {
//       res.push(product, ...helper(product.mod, product.name));
//       return;
//     }
//     res.push(product);
//   });
//   return res;
// };
