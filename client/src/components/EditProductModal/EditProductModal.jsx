import {Dialog, DialogTitle} from "@mui/material";
import React from 'react';

const EditProductModal = ({open, setOpen}) => {


  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Hello!</DialogTitle>
    </Dialog>
  );
};

export default EditProductModal;