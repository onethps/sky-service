import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Select
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import React, {useState} from 'react';

const EditProductModal = ({open, setOpen}) => {

  const [price, setPrice] = useState(10)
  const [marginPricePercent, setMarginPricePercent] = useState(120)
  const [salePrice, setSalePrice] = useState(0)

  const handleChangePrice = (e) => {
    setPrice(e.target.value)
    setMarginPricePercent((+(salePrice - e.target.value) / e.target.value * 100).toFixed(2))
  }

  const handlePercent = (e) => {
    setMarginPricePercent(e.target.value)
    setSalePrice(+((price / 100) * e.target.value + +price).toFixed(2))
  }

  const handleSalePrice = (e) => {
    setSalePrice(e.target.value)
    setMarginPricePercent((+(e.target.value - price) / price * 100).toFixed(2))
  }


  return (
    <Dialog open={open} onClose={() => setOpen(false)} >
      <DialogTitle>Карточка</DialogTitle>
      <DialogContent>

        <Grid container >
          <Grid item xs={6} lg={12}>
            <DialogContentText>Наименование</DialogContentText>
            <TextField
              size={'small'}
              variant="outlined"
            />
            <Divider sx={{m:'20px 0'}}/>
            <DialogContentText>Категория</DialogContentText>
            <Box sx={{display:'flex', justifyContent:'space-between', minWidth:'100%'}}>
              <Select
                size={'small'}
                sx={{minWidth:210}}
                variant="outlined"
                value={20}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Выставить на продажу" />
            </Box>
            <Divider sx={{m:'20px 0'}}/>
            <Box sx={{display:'flex', justifyContent:'space-between', minWidth:'100%'}}>
              <Box>
                <DialogContentText>Количество</DialogContentText>
                <TextField
                  size={'small'}
                  variant="outlined"
                  value={'15'}
                  type={'number'}
                />
              </Box>
              <Box>
                <DialogContentText>Еденица измерения</DialogContentText>
                <Select
                  size={'small'}
                  sx={{minWidth:210}}
                  variant="outlined"
                  value={10}
                >
                  <MenuItem value={10}>шт.</MenuItem>
                  <MenuItem value={20}>кг.</MenuItem>
                  <MenuItem value={30}>мл.</MenuItem>
                </Select>
              </Box>
            </Box>
            <DialogContentText>Минимальный остаток</DialogContentText>
            <TextField
              size={'small'}
              variant="outlined"
              value={'11'}
              type={'number'}
            />

            <Box sx={{display:'flex', justifyContent:'space-between',
              minWidth:'100%', backgroundColor:'#D4EDDA', padding:'10px', alignItems:'flex-end', gap:'20px'}}>
              <Box>
                <DialogContentText>Себестоимость</DialogContentText>
                <TextField
                  size={'small'}
                  variant="outlined"
                  value={price}
                  name={'price'}
                  type={'number'}
                  onChange={handleChangePrice}
                />
              </Box>
              <DialogContentText sx={{marginBottom:'10px'}}>+</DialogContentText>
              <Box>
                <DialogContentText>Наценка</DialogContentText>
                <TextField
                  size={'small'}
                  variant="outlined"
                  value={marginPricePercent}
                  name={'price_margin'}
                  type={'number'}
                  onChange={handlePercent}
                />
              </Box>
              <DialogContentText  sx={{marginBottom:'10px'}}>=</DialogContentText>
              <Box>
                <DialogContentText>Цена</DialogContentText>
                <TextField
                  size={'small'}
                  variant="outlined"
                  value={salePrice}
                  type={'number'}
                  name={'price_sale'}
                  onChange={handleSalePrice}

                />
              </Box>
            </Box>

          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{display:'flex', width:'100%'}}>
        <Button  sx={{display:'flex', flexGrow:1}}  variant="contained" color="error">Удалить</Button>
        <Button sx={{display:'flex', flexGrow:1}} variant="contained" color="success">Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductModal;