import React, { FC, useEffect, useState } from 'react';
import { balanceMock, walletFields } from 'features/HomePage/constants/constants';
import { ModalWrapper } from 'shared/components/ModalWrapper/ModalWrapper';

import { Button, DialogActions, Grid } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';

export interface IChooseWalletProps {
  handleInputValue: (v: string) => void;
  isOpenModal: boolean;
  setIsOpenModal: (v: boolean) => void;
}

export const ChooseWalletModal: FC<IChooseWalletProps> = ({
  isOpenModal,
  setIsOpenModal,
  handleInputValue,
}) => {
  const handleCloseModal = () => setIsOpenModal(false);

  const handleClickOnRow = (event: GridRowParams) => {
    handleInputValue(event.row.name);
    setIsOpenModal(false);
  };

  return (
    <ModalWrapper open={isOpenModal} setOpen={setIsOpenModal} modalTitle={'Выбрать счет'}>
      <Grid container>
        <Grid item xs={6} md={12} xl={16}>
          <DataGrid
            columns={walletFields}
            rows={balanceMock}
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
    </ModalWrapper>
  );
};
