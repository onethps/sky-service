import { useEffect, useState } from 'react';
import { IProduct } from 'interfaces/product.interfaces';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';

import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';

import { fetchProducts } from './bll/middleware/products';
import EditProductModal from './components/EditProductModal';
import { ProductColFields } from './constants/constants';

export const ProductsPage = () => {
  const products = useAppSelector((state) => state.products.products);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [currentProductCard, setCurrentProductCard] = useState<IProduct | null>(null);

  const findProduct = (id: string) => {
    const selectedProduct = products.find((el: IProduct) => el.id === id);
    if (!selectedProduct) return;

    setCurrentProductCard(selectedProduct);
  };

  const handleEditProductModal = (params: GridCellParams<IProduct, any, any>) => {
    //  avoid cell clicks on on select cells
    if (params.field === 'category' || params.field === 'inSale') {
      return;
    }

    if (params.row.productType === 'mod') {
      findProduct(params.row.productId);
    }

    findProduct(params.row.id);
    setOpenModal(true);
  };

  return (
    <Box
      sx={{
        '& .data-grid-rows--Filled': {
          bgcolor: grey[100],
          '&:hover': {
            bgcolor: grey[100],
          },
        },
      }}
    >
      <DataGrid
        sx={{ minHeight: 500, minWidth: 1000, backgroundColor: 'white' }}
        getRowId={(row: IProduct) => row.id}
        columns={ProductColFields}
        rows={products}
        onCellClick={handleEditProductModal}
        getRowClassName={(params) => {
          if (params.row.type === 'mod') {
            return 'data-grid-rows--Filled';
          }

          return '';
        }}
      />
      <EditProductModal
        open={openModal}
        setOpen={setOpenModal}
        currentProduct={currentProductCard}
      />
    </Box>
  );
};
