import { IProduct } from 'interfaces/product.interfaces';
import { instance } from 'services/config';

export const productsApi = {
  getProducts() {
    return instance.get<IProduct[]>('/products/');
  },
  updateProduct(id: string, product: IProduct) {
    return instance.put<IProduct>(`/products/${id}`, product);
  },
  updateProducts(products: IProduct[]) {
    return instance.post<IProduct[]>(`/products/updateProducts`, {
      products,
    });
  },
  addProduct(newProduct: Omit<IProduct, '_id'>) {
    return instance.post<IProduct>('/products/', newProduct);
  },
};
