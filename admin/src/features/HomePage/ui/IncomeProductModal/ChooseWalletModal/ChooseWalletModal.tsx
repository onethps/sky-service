import React, { FC, useEffect, useState } from 'react';
import { ModalWrapper } from 'shared/components/ModalWrapper/ModalWrapper';

import { Button, DialogActions, Grid } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';

import { WalletOptionsType } from '../NewProductModal/constants';

import { mockRows, walletFields } from './constants';

export interface IChooseWalletProps {
  selectWalletValue: string;
  chooseWalletValue: string;
  setSelectWalletValue: (val: string) => void;
  setSelectWalletOptions: (arr: WalletOptionsType[]) => void;
  selectWalletOptions: WalletOptionsType[];
}

export const ChooseWalletModal: FC<IChooseWalletProps> = ({
  selectWalletValue,
  selectWalletOptions,
  setSelectWalletOptions,
  chooseWalletValue,
  setSelectWalletValue,
}) => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (selectWalletValue === chooseWalletValue) {
      setOpenModal(true);
    }
  }, [selectWalletValue]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectWalletValue(selectWalletOptions[0].value);
  };

  const handleClickOnRow = (event: GridRowParams) => {
    const lastId = selectWalletOptions[selectWalletOptions.length - 1].id;
    setSelectWalletOptions([
      ...selectWalletOptions,
      { id: lastId + 1, value: event.row.name },
    ]);
    setSelectWalletValue(event.row.name);
    setOpenModal(false);
  };
  return (
    <ModalWrapper open={openModal} setOpen={setOpenModal} modalTitle={'Вибрати рахунок'}>
      <Grid container>
        <Grid item xs={6} md={12} xl={16}>
          <DataGrid
            columns={walletFields}
            rows={mockRows}
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
