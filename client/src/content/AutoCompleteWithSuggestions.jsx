import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function FreeSoloCreateOption({value, index, name, handleInputs}) {
  const [newV, setnewW] = React.useState(null);
  const [openDialog, toggleOpenDialog] = React.useState(false);

  const [dialogValue, setDialogValue] = React.useState({
    title: '',
    year: '',
  });

  const handleClose = () => {
    setDialogValue({
      title: '',
      year: '',
    });

    toggleOpenDialog(false);
  };

    const handleSubmit = (event) => {
      event.preventDefault();
      // setnewW({
      //   title: dialogValue.title,
      //   year: parseInt(dialogValue.year, 10),
      // });

      handleClose();
    };


    return (
      <>
    <Autocomplete
      size={'small'}
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          // timeout to avoid instant validation of the dialog's form.
          setTimeout(() => {
            toggleOpenDialog(true);
            setDialogValue({
              title: newValue,
              year: '',
            });
          });
        } else if (newValue && newValue.inputValue) {
          toggleOpenDialog(true);
          setDialogValue({
            title: newValue.inputValue,
            year: '',
          });
        } else {
          setnewW(newValue);

        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      handleHomeEndKeys
      options={top100Films}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params}/>
      )}
    />
    <Dialog open={openDialog} onClose={handleClose}>
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
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 }
]
