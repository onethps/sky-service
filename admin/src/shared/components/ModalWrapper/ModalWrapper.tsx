import React, { FC } from 'react';

import { Box, Divider, ModalProps, Typography } from '@mui/material';
import { Modal as MuiModal } from '@mui/material';

import { style } from './Modal.styles';

interface ModalWrapperTypes extends ModalProps {
  modalTitle: string;
  setOpen: (isOpenModal: boolean) => void;
  maxWidth?: string;
}

export const ModalWrapper: FC<ModalWrapperTypes> = (props) => {
  const { modalTitle, children, open, setOpen, maxWidth, ...restProps } = props;

  const handleClose = () => setOpen(false);

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      {...restProps}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style.modal, width: maxWidth ? maxWidth : '80%' }}>
        <Typography variant={'h5'}>{modalTitle}</Typography>
        <Divider sx={{ m: '10px 0' }} />
        <Box sx={style.window}>{children}</Box>
      </Box>
    </MuiModal>
  );
};
