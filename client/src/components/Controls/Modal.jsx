import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { Modal as MuiModal } from '@mui/material';

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
  },
  window: {
    position: 'relative',
    overflow: 'scroll',
    height: '80vh',
    bgcolor: 'background.paper',
    paddingBottom: 5,
  },
};

export default function BasicModal(props) {
  const { modalTitle, children, open, setOpen, ...restProps } = props;

  const handleClose = () => setOpen(false);

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'lg'}
      {...restProps}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style.modal}>
        <Typography variant={'h5'}>{modalTitle}</Typography>
        <Divider sx={{ m: '10px 0' }} />
        <Box sx={style.window}>{children}</Box>
      </Box>
    </MuiModal>
  );
}
