import { Box, Container, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react'
import { useState} from 'react'
import { useEffect } from 'react'
import { CryptoState } from '../CryptoContext'
import { numberWithCommas } from './Banner/Carousel'
import { useNavigate } from 'react-router-dom';

const CoinsTable = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1)
    const navigate = useNavigate();
  
    const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

    useEffect(() => {
    fetchCoins()
    }, [currency])

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
      const handleSearch = () => {
          return coins.filter((coin) => (
              coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search) || coin.name.toUpperCase().includes(search) || coin.symbol.toUpperCase().includes(search)
          ))
      }
  return (
      <div>
        <ThemeProvider theme={darkTheme}>
            <Container style={{textAlign: "center"}}>
                <Box sx={{
                    m:5,
                    fontFamily: 'Montserrat' 
                }}>
                <Typography variant='h4'>
                Preise nach Marktkapitalisierung
                </Typography>
                </Box>
                <TextField 
                    label="Suche nach einem Coin.." 
                    variant='outlined'
                    style={{marginBottom: 20, width: "100%"}}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress style={{ backgroundColor: "#f2a900"}} />
                        ) : (
                            <Table>
                                <TableHead style={{backgroundColor: '#f2a900'}}> 
                                    <TableRow>
                                        {["Coin", "Preis", "24h", "Wert"].map ((head) => (
                                            <TableCell 
                                                style={{
                                                    color: "black",
                                                    fontWeight: "700",
                                                    fontFamily: "Monserrat",
                                                    }}
                                                    key={head}
                                                    align={head === "Coin" ? "" : "right"}
                                                >
                                                    {head}
                                            </TableCell>                        
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                        {handleSearch()
                                        .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                        .map(row => {
                                            const profit = row.price_change_percentage_24h > 0;
                                            return (
                                                <TableRow onClick={ () =>navigate(`/coins/${row.id}`)}
                                                     sx={{
                                                    cursor: "pointer",
                                                    '&:hover': {
                                                        backgroundColor: "#131111"
                                                    }}}
                                                    key={row.name}>
                                                        <TableCell 
                                                            component="th"
                                                            scope='row'
                                                            style={{
                                                                display: "flex",
                                                                gap: 15,
                                                            }}   
                                                        >
                                                            <img 
                                                                src={row?.image}
                                                                alt={row.name}
                                                                height="50"
                                                                style={{ marginBottom: 10 }}
                                                            />
                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                <span style={{textTransform: "uppercase", fontSize:22,}}>
                                                                    {row.symbol}
                                                                </span>
                                                                <span style={{color: "darkgrey" }}>{row.name}</span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell
                                                            align="right">
                                                            {symbol}{" "}
                                                            {numberWithCommas(row.current_price.toFixed(2))} 
                                                        </TableCell>
                                                        <TableCell  
                                                            align="right"
                                                            style={{color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                            fontWeight: 500,
                                                        }}  
                                                        > {profit && "+"}
                                                            {row.price_change_percentage_24h.toFixed(2)} % 
                                                        </TableCell>
                                                        <TableCell  
                                                            align="right">
                                                            {symbol}{" "}
                                                            {numberWithCommas(
                                                                row.market_cap.toString().slice(0, -6))}M 
                                                        </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                </TableBody>
                            </Table>
                        )}
                </TableContainer>
               
                    <Pagination color="primary" sx={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        }}
                        count={(handleSearch()?.length / 10).toFixed(0)}
                        onChange={(_, value) => {
                            setPage(value);
                            window.scroll(0, 450);
                            }}
                            />                                         
                </Container>
        </ThemeProvider>  
    </div>
  )
};

export default CoinsTable