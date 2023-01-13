import { Box, Divider, ModalProps, Typography } from '@mui/material';
import { Modal as MuiModal } from '@mui/material';
import React, { FC } from 'react';

const style = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#fafafa',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    width: '80%',
    maxWidth: '2000px',
  },
  window: {
    padding: 2,
    position: 'relative',
    overflow: 'scroll',
    height: '80vh',
    bgcolor: 'background.paper',
    paddingBottom: 5,
  },
};

interface BasicModalTypes extends ModalProps {
  modalTitle: string;
  setOpen: (isOpenModal: boolean) => void;
  maxWidth?: string;
}

const BasicModal: FC<BasicModalTypes> = (props) => {
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
export default BasicModal;
