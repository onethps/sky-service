import { ProductType } from 'features/ProductsPage/bll/types';
import { instance } from 'services/config';

export const productsApi = {
  getProducts() {
    return instance.get<ProductType[]>('dashboard/products/');
  },
  updateProduct(id: string, product: ProductType) {
    return instance.post<ProductType>(`dashboard/products/${id}`, product);
  },
  updateProducts(products: ProductType[]) {
    return instance.post<ProductType[]>(`dashboard/products/updateProducts`, {
      products,
    });
  },
  addProduct(data: ProductType) {
    return instance.post<ProductType>('dashboard/products/', {
      ...data,
    });
  },
};
