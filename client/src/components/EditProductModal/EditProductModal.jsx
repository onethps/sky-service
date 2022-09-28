import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography
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
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}  maxWidth={'lg'} >

      <DialogTitle>
        <Typography variant="h4">Карточка</Typography>
        <Divider sx={{m:'20px 0'}}/>
      </DialogTitle>
      <DialogContent>

        <Grid container >
          <Grid item xs={6} lg={12} >
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label ">Тип товара</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="Поштучно/Ингридиент" />
                <FormControlLabel value="male" control={<Radio />} label="Тех.карта/Приготовление" />
              </RadioGroup>
            </FormControl>


            <TextField
              sx={{display:'block'}}
              id="filled-search"
              label="Наименование"
              type="search"
              variant="filled"
            />

            <Divider sx={{m:'20px 0'}}/>
            <Box sx={{display:'flex'}}>
              <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-filled-label">Категория</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={10}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
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
              minWidth:'100%', backgroundColor:'#e3f2fd', padding:'10px', alignItems:'flex-end', gap:'20px'}}>
              <Box>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">Себестоимость</InputLabel>
                  <FilledInput
                    id="filled-adornment-password"
                    value={price}
                    onChange={handleChangePrice}
                    endAdornment={<InputAdornment position="end">₴</InputAdornment>}
                  />
                </FormControl>
              </Box>
              <DialogContentText sx={{marginBottom:'20px'}}>+</DialogContentText>
              <Box>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">Наценка</InputLabel>
                  <FilledInput
                    id="filled-adornment-password"
                    value={marginPricePercent}
                    onChange={handlePercent}
                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                  />
                </FormControl>
                {/*<TextField*/}
                {/*  size={'small'}*/}
                {/*  variant="outlined"*/}
                {/*  value={marginPricePercent}*/}
                {/*  name={'price_margin'}*/}
                {/*  type={'number'}*/}
                {/*  onChange={handlePercent}*/}
                {/*/>*/}
              </Box>
              <DialogContentText  sx={{marginBottom:'20px'}}>=</DialogContentText>
              <Box>
                {/*<TextField*/}
                {/*  size={'small'}*/}
                {/*  variant="outlined"*/}
                {/*  value={salePrice}*/}
                {/*  type={'number'}*/}
                {/*  name={'price_sale'}*/}
                {/*  onChange={handleSalePrice}*/}

                {/*/>*/}
                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">Цена</InputLabel>
                  <FilledInput
                    id="filled-adornment-password"
                    value={salePrice}
                    onChange={handleSalePrice}
                    endAdornment={<InputAdornment position="end">₴</InputAdornment>}
                  />
                </FormControl>
              </Box>
            </Box>

          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Button fullWidth variant="contained" size={'large'} color="error">Удалить</Button>
          </Grid>
          <Grid item md={6}  xs={12}>
            <Button fullWidth size={'large'} variant="contained" color="primary">Сохранить</Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductModal;