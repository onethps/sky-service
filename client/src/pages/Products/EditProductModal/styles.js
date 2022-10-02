export const modalStyles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    minWidth: 1000,
    '.MuiTextField-root': {
      maxWidth: '30ch',
      margin: '10px 0',
    },
    '.MuiFormControl-root': {
      width: '30ch',
    },
  },
  divider: {
    m: '5px 0',
  },
  calculatePrice: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '100%',
    backgroundColor: '#e3f2fd',
    padding: '10px',
    alignItems: 'flex-end',
    gap: '20px',
  },
  buttons: {
    display: 'flex',
    gap: 2,
  },
};
