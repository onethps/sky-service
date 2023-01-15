import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { selectProducts } from 'pages/Products/selectors';
import { TechCardType } from 'pages/Products/TechCard/types';
import { ProductType } from 'pages/Products/types';
import { useSelector } from 'react-redux';

import Autocomplete, {
  AutocompleteProps,
  createFilterOptions,
} from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const filter = createFilterOptions<FilmOptionType>();

type AutoType = {
  name: string;
  handleName: (name: string, tabIndex: number, value: string) => void;
  tabIndex: number;
  techCardIndex: number;
  techCardsList: TechCardType[];
  setTechCardsList: (techCards: TechCardType[]) => void;
};
const AutocompleteInput: FC<AutoType> = ({
  handleName,
  name,
  tabIndex,
  techCardIndex,
  techCardsList,
  setTechCardsList,
}) => {
  const [open, toggleOpen] = React.useState(false);

  const [value, setValue] = useState<FilmOptionType | null>(null);

  const handleClose = () => {
    setDialogValue({
      title: '',
      year: '',
    });
    toggleOpen(false);
  };

  useEffect(() => {
    const values: any = [...techCardsList];
    if (value) {
      const currentRow = values[techCardIndex].modTables[tabIndex];
      currentRow.name = value.title;
      currentRow.price = value.price;
      currentRow.count = 0;
      currentRow.summ = 0;
      setTechCardsList(values);
    }
  }, [value]);

  const [dialogValue, setDialogValue] = React.useState({
    title: '',
    year: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValue({
      title: dialogValue.title,
      year: parseInt(dialogValue.year, 10),
    });

    handleClose();
  };

  const products = useSelector(selectProducts);

  const handleProductsNames = (array: ProductType[]) => {
    const res: FilmOptionType[] = [];
    array.forEach((el) => {
      res.push({ title: el.name, price: el.price });
    });

    return res;
  };

  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                title: newValue,
                year: '',
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              title: newValue.inputValue,
              year: '',
            });
          } else {
            setValue(newValue);
            if (newValue) handleName(name, tabIndex, newValue.title);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={handleProductsNames(products.products)}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Name" />}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new film</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any film in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.title}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  title: event.target.value,
                })
              }
              label="title"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              value={dialogValue.year}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  year: event.target.value,
                })
              }
              label="year"
              type="number"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AutocompleteInput;

export interface FilmOptionType {
  inputValue?: string;
  title: string;
  year?: number;
  price?: number;
}
