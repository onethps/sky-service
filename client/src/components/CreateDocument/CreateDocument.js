import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import {LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from "dayjs";
import React, {useState} from 'react';

const CreateDocument = () => {


  const [open, setOpen] = useState(true)
  const [valueDate, setValueDate] = useState(dayjs());
  const [valueTime, setValueTime] = useState(dayjs());
  const [incomeProduct, setIncomeProduct] = useState('Приход товара')
  const [supplier, setSupplier] = useState('Нет')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeData = (newValue) => {
    setValueDate(newValue);
  };

  const handleChangeTime = (newValue) => {
    setValueTime(newValue);
  };


  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const createData = (name, count, scale, price, fullPrice, retailPrice) => {
    return { name, count, scale, price, fullPrice, retailPrice };
  }

  const rows = [
    {
      name:'',
      count:'',
      scale:'',
      price:'',
      fullPrice:'',
      retailPrice:''
    },
    {
      name:'',
      count:'',
      scale:'',
      price:'',
      fullPrice:'',
      retailPrice:''
    },
  ];

  const [srows, setSRows] = useState([
    {
      name:'',
      count:'',
      scale:'',
      price:'',
      fullPrice:'',
      retailPrice:''
    }
  ])

  const handleInputs = (index, event) => {
    const value = [...srows];
    value[index][event.target.name] = event.target.value
    setSRows(value)
    console.log(srows)
    console.log(event.target.name)
  }

  const handleAddInputs = () => {
    setSRows([...srows, {
        name:'',
        count:'',
        scale:'',
        price:'',
        fullPrice:'',
        retailPrice:''
    }])
  }

  const handleRemoveInputs = (index) => {
    const values = [...srows]
    values.splice(index, 1)
    setSRows(values)



  }


  return (
    <>
      <Dialog open={open} onClose={handleClose}
              fullWidth={true}
              maxWidth={'lg'}
      >
        <DialogTitle>Новый приход</DialogTitle>

        <DialogContent
          sx={{
            display: 'flex',
            flexDirection:'column',
            m: 'auto',
            width: 'fit-content',
            p:'50px'
          }}
        >
          <DialogTitle sx={{m:0, p:0}}>Дата</DialogTitle>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{display:'flex',   m: 'auto', gap:'50px',
              width: 'fit-content',p:'10px'}}>
              <DesktopDatePicker
                sx={{pt:10}}
                label="Date desktop"
                inputFormat="MM/DD/YYYY"
                value={valueDate}
                onChange={handleChangeData}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                label="Time"
                value={valueTime}
                onChange={handleChangeTime}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
          </LocalizationProvider>

          <DialogTitle  sx={{m:'15px 0', p:0}}>Категория трат</DialogTitle>
          <Box>
            <FormControl sx={{marginRight:'20px'}}>
              <Select
                value={incomeProduct}
                onChange={handleChange}
              >
                <MenuItem value={incomeProduct}>Приход Товара</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <Select
                value={supplier}
                onChange={handleChange}>

                <MenuItem value={supplier}>Нет</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <DialogTitle  sx={{m:'15px 0', p:0}}>Списать деньги</DialogTitle>
          <Box>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Нет"
                name="radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="Да" />
                <FormControlLabel value="male" control={<Radio />} label="Нет" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box sx={{display:'flex'}}>
            <DialogTitle sx={{m:'15px 0', p:0, flexGrow:1}}>Список товаров</DialogTitle>
            <IconButton color="primary" aria-label="upload picture" component="label" onClick={handleAddInputs}
            >
              <AddBoxIcon/>
            </IconButton>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Наименование</TableCell>
                <TableCell align="left">Кол-во</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left">Цена</TableCell>
                <TableCell align="left">Сумма</TableCell>
                <TableCell align="left">Цена розн.</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {srows?.map((row,index) => (
                <TableRow
                  key={ index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
                >
                  <TableCell>
                    <TextField size="small" value={row.name}  name='name' onChange={(e) => handleInputs(index, e)}/>
                  </TableCell>

                  <TableCell>
                    <TextField size="small" value={row.count}  name='count' onChange={(e) => handleInputs(index, e)}/>
                  </TableCell>
                  <TableCell>
                    <TextField
                      name='scale'
                      onChange={(e) => handleInputs(index, e)}
                      sx={{ width: '10ch' }}  size="small" value={row.scale}/>
                  </TableCell>
                  <TableCell>
                    <TextField
                      onChange={(e) => handleInputs(index, e)}
                      id="outlined-select-currency"
                      select
                      defaultValue={'kg'}
                      size={'small'}
                      value={'kg'}
                    >
                      <MenuItem value={'kg'}>
                        kg
                      </MenuItem>
                    </TextField>

                  </TableCell>
                  <TableCell>
                    <TextField   onChange={(e) => handleInputs(index, e)} size="small" sx={{ width: '10ch' }} value={row.price} name={'price'}/>
                  </TableCell>
                  <TableCell>
                    <TextField   onChange={(e) => handleInputs(index, e)} size="small" sx={{ width: '10ch' }} value={row.fullPrice} name={'fullPrice'}/>
                  </TableCell>
                  <TableCell>
                    <TextField   onChange={(e) => handleInputs(index, e)} size="small" sx={{ width: '10ch' }} value={row.retailPrice} name={'retailPrice'}/>
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                      <DeleteSweepIcon onClick={() => handleRemoveInputs(index)}/>
                    </IconButton>

                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>

      <Grid item xs={12} md={8} lg={12}>
        <Card variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Создать документ
          </Typography>
          <Button variant="contained" onClick={handleClickOpen}>Приход товара</Button>
        </Card>
      </Grid>
    </>
  );
};

export default CreateDocument;