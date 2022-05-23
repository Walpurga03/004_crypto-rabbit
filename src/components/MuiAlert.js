import { Alert, Snackbar, Stack } from '@mui/material'
import React from 'react'
import { CryptoState } from '../CryptoContext'


const MuiAlert = () => {
  const { alert, setAlert } = CryptoState();
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({open: false});
  } 
  return (
    <Snackbar 
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleCloseAlert}>
      <Stack>
        <Alert 
          onClick={handleCloseAlert}
          elevation={10}
          variant="filled"
          severity={alert.type}>{alert.message}
        </Alert>
      </Stack>
          
    </Snackbar>
  )
}

export default MuiAlert