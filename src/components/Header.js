import { AppBar, Toolbar, Container, Select, MenuItem } from '@mui/material'
import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext';
import Link from '@mui/material/Link';

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
                    <Link href="/" underline="none" color ="gold" fontFamily= "Monserrat"  fontWeight= "bold">
                      {'Crypto Rabbit'}
                    </Link> 
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

