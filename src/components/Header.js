import { AppBar, Toolbar, Container, Select, MenuItem } from '@mui/material'
import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import AuthModal from './Authentication/AuthModel'
import UserSidebar from './Authentication/UserSidebar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Header = () => {

    const { currency, setCurrency, user} = CryptoState()
    const navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
        <AppBar color='transparent' position='static'>
            <Container>
                <Toolbar style={{ justifyContent: "space-between"}}>
                    <Typography onClick={()=> navigate("/")}
                    sx={{
                      flex:1,
                      color:"#f2a900",
                      fontFamily:"Montserrat",
                      fontWeight:"bold",
                      cursor:"pointer"
                      }}>
                      Crypto Rabbit
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
                    {user ? <UserSidebar /> : <AuthModal />}
                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
  )
}

export default Header

