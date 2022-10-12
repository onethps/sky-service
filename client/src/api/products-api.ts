import { instance } from 'api/config';
import { ProductType } from 'pages/Products/types';

export const productsApi = {
  getProducts() {
    return instance.get<ProductType[]>('dashboard/products/');
  },
  updateProduct(id: string, product: ProductType) {
    return instance.post<ProductType>(`dashboard/products/${id}`, product);
  },
  addProduct(data: ProductType) {
    return instance.post<ProductType[]>('dashboard/products/', {
      ...data,
    });
  },
};