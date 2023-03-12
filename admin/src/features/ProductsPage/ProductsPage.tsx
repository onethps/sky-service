import { useState } from 'react';
import { IProduct } from 'interfaces/product.interfaces';

import { Box, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';

import EditProductModal from './components/EditProductModal';
import { ProductColFields } from './constants/constants';
import { useFetchProducts } from './hooks/useFetchProducts';

const DataGridWrapperStyle = styled(Box)(({ theme }) => ({
  '& .data-grid-rows--Filled': {
    bgcolor: grey[100],
    '&:hover': {
      bgcolor: grey[100],
    },
  },
}));

export const ProductsPage = () => {
  const { products } = useFetchProducts();

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
    <DataGridWrapperStyle>
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
    </DataGridWrapperStyle>
  );
};
