import { AppBar, Toolbar, Container, Typography, Select, MenuItem } from '@mui/material'
import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Header = () => {

    const { currency, setCurrency} = CryptoState()
    console.log(currency)
  return (
    <ThemeProvider theme={darkTheme}>
        <AppBar color='transparent' position='static'>
            <Container>
                <Toolbar style={{ justifyContent: "space-between"}}>
                    <Typography variant='h6'
                                style={{ fley: 1,
                                color: "gold",
                                fontFamily: "Monserrat",
                                fontWeight: "bold",
                                curser: "pointer",}}
                                    >Crypto Rabbit
                    </Typography>
                    <Select variant='outlined'
                        style={{
                            width: 100,
                            height: 40,
                            marginRight: 15,
                        }}
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}>
                        <MenuItem value={'USD'}>USD</MenuItem>
                        <MenuItem value={'EUR'}>EUR</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
  )
}

export default Header

