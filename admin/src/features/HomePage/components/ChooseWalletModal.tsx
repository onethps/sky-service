import React, { FC } from 'react';
import { ModalWrapper } from 'shared/components/ModalWrapper/ModalWrapper';

import { Button, DialogActions, Grid } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';

export const walletFields = [
  {
    field: 'name',
    headerName: 'Наименование',
    minWidth: 300,
    flex: 1,
  },
  {
    field: 'balance',
    headerName: 'Баланс',
    minWidth: 300,
    flex: 1,
  },
];

export const balanceMock = [
  {
    id: 1,
    name: 'Balance1',
    balance: 222,
  },
  {
    id: 2,
    name: 'Balance2',
    balance: 33334,
  },
];

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
