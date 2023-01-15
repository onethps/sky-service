export const modalStyles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
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
    justifyContent: 'space-around',
    backgroundColor: '#e3f2fd',
    padding: '10px',
    overflowY: 'hidden',
    gap: '20px',
  },
  buttons: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 5,
    display: 'flex',
    gap: 2,
    width: '100%',
    padding: '10px 5px',
    backgroundColor: 'white',
  },
};
