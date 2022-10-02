import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { Modal as MuiModal } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',
  display: 'block',
  height: '80%',
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
      <Box sx={style}>
        <Typography variant={'h4'}>{modalTitle}</Typography>
        <Divider sx={{ m: '20px 0' }} />
        {children}
      </Box>
    </MuiModal>
  );
}
