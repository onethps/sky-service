import { useEffect, useState } from 'react';
import { updateProduct } from 'features/ProductsPage/bll/middleware/products';
import { ProductType } from 'features/ProductsPage/bll/types';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux-hooks';

import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';

import EditProductModal from './ui/EditProductModal/EditProductModal';
import { TechCardType } from './ui/TechCard/types';
import { allProductsFields2 } from './utils/constants';

export const ProductsPage = () => {
  const products = useAppSelector((state) => state.products.products);
  const dispatch = useAppDispatch();

  const rowsWithTechCardItems = () => {
    const res: any = [];

    const helper = (product: TechCardType[], techCardName: string) => {
      const res: any = [];
      product.forEach((product) => {
        res.push({
          _id: product.id,
          techCardName,
          name: product.modName,
          price: product.priceMod,
          netPrice: product.netPriceMod,
          marginPercent: product.marginPricePercentMod,
          productType: 'sklad',
        });
      });
      return res;
    };

    products.forEach((product) => {
      if (product.productType === 'mod') {
        res.push(product, ...helper(product.mod, product.name));
        return;
      }
      res.push(product);
    });
    return res;
  };

  // const [order, setOrder] = useState<Order>('asc');
  // const [orderBy, setOrderBy] = useState<string>('Наименование');
  // const [selected, setSelected] = useState<readonly string[]>([]);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState<boolean>(false);

  // const handleRequestSort = (event: MouseEvent, property: any) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  // const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     const newSelected = products.map((n: ProductType) => n.name);
  //     setSelected(newSelected);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event: any, name: string) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected: readonly string[] = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  // const handleChangePage = (event: unknown, newPage: number) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const [currentProductCard, setCurrentProductCard] = useState<ProductType | null>(null);

  const findProduct = (id: string) => {
    const filter = products.filter((el: ProductType) => el._id === id)[0];
    setCurrentProductCard(filter);
  };

  const handleAddNewProduct = () => {
    setCurrentProductCard(null);
    setOpenModal(true);
  };

  const updateProductCategories = (id: string, product: ProductType) => {
    dispatch(updateProduct({ id, product }));
  };

  const handleEditProductModal = (params: GridCellParams<ProductType, any, any>) => {
    //  avoid cell clicks on on select cells
    if (params.field === 'category' || params.field === 'inSale') {
      return;
    }
    findProduct(params.row._id);
    setOpenModal(true);
  };

  return (
    <Box
      // techcard style
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
        getRowId={(row: ProductType) => row._id!}
        columns={allProductsFields2}
        rows={rowsWithTechCardItems()}
        onCellClick={handleEditProductModal}
        getRowClassName={(params) => {
          if (params.row.productType === 'mod' || params.row.productType === 'sklad') {
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
      {/* <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={products.length}
              />
              <TableBody>
                {stableSort(products, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: ProductType, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return !row.mod.length ? (
                      <TableRowNormal
                        key={row._id}
                        isItemSelected={isItemSelected}
                        row={row}
                        handleClick={handleClick}
                        labelId={labelId}
                        handleModal={handleModal}
                        updateProductCategories={updateProductCategories}
                      />
                    ) : (
                      <TableRowGroup
                        key={row._id}
                        isItemSelected={isItemSelected}
                        row={row}
                        handleClick={handleClick}
                        labelId={labelId}
                        handleModal={handleModal}
                      />
                    );
                  })}

                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Button onClick={handleAddNewProduct}>Add</Button>
      </Box> */}
    </Box>
  );
};
