import React, { FC, useEffect, useState } from 'react';
import { Button, DialogActions, Grid } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { columns, rows } from './dataGrid';
import Controls from '../../../../components/Controls';
import { arrayOfWallet } from '../IncomeProductModal';

type ChooseWalletType = {
  selectWalletValue: null | string;
  openModalValue: string;
  setSelectWalletValue: (val: string | null) => void;
};

export const ChooseWalletModal: FC<ChooseWalletType> = ({
  selectWalletValue,
  openModalValue,
  setSelectWalletValue,
}) => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (selectWalletValue === openModalValue) {
      setOpenModal(true);
    }
  }, [selectWalletValue]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectWalletValue(arrayOfWallet[0].title);
  };

  const handleClickOnRow = (event: GridRowParams) => {
    setSelectWalletValue(event.row.name);
    console.log(event.row.name);
    setOpenModal(false);
  };
  return (
    <Controls.BasicModal
      open={openModal}
      setOpen={setOpenModal}
      modalTitle={'Вибрати рахунок'}
    >
      <Grid container>
        <Grid item xs={6} md={12} xl={16}>
          <DataGrid
            columns={columns}
            rows={rows}
            autoHeight={true}
            disableSelectionOnClick
            onRowClick={(event) => handleClickOnRow(event)}
          />
          <DialogActions sx={{ display: 'flex', width: '100%' }}>
            <Button
              onClick={handleCloseModal}
              sx={{ display: 'flex', flexGrow: 1 }}
              variant="contained"
              color="info"
            >
              Закрити
            </Button>
            <Button
              sx={{ display: 'flex', flexGrow: 1 }}
              variant="contained"
              color="success"
            >
              Додати
            </Button>
          </DialogActions>
        </Grid>
      </Grid>
    </Controls.BasicModal>
  );
};
