
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CoinInfo from '../components/CoinInfo';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { Box, Button, LinearProgress, Typography } from  '@mui/material';
import parse from 'html-react-parser'
import { numberWithCommas } from '../components/Banner/Carousel';
import {styled} from "@mui/material/styles"
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const RespoContainer = styled('div')(({theme}) => ({
  [theme.breakpoints.up('md')]: {
    display:"flex"
   },
  [theme.breakpoints.down('md')]: {
   flexDirection:"column",
   alignItems: "center",
   padding: "0.3rem"
  }
}))

const RespoSidebar = styled('div')(({theme}) => ({
  [theme.breakpoints.up('md')]: {
            width: "35%",
            display:"flex",
            flexDirection: "column",
            alignItems: "center",
            borderRight: "2px solid grey"
   },
  [theme.breakpoints.down('md')]: {
             width: "100%",
            display:"flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2rem"
  }
}))

const Coinpage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const { currency, symbol, user, watchlist, setAlert } =CryptoState();

    useEffect(() => {
      const fetchCoin = async() => {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
    };
        fetchCoin();
    }, [id]);

    const inWatchlist = (watchlist || '').includes(coin?.id);

    const addToWatchlist = async () => {
      const coinRef = doc(db, "watchlist", user.uid);
      try {
        await setDoc(coinRef,
          {coins: watchlist ? [...watchlist,coin?.id] : [coin?.id]})
          setAlert({
            open:true,
            message: `${coin.name} hinzugefügt zur Watchlist!`,
            type: "success",
          })
      } catch (error) {
        setAlert({
          open:true,
          message: error.message,
          type: "error",
        })
      }
    }

    const removeFromWatchlist = async () => {
      const coinRef = doc(db, "watchlist", user.uid);
      try {
        await setDoc(coinRef,
          {coins: watchlist.filter((watch) => watch !== coin?.id)},
          {merge:'true'})
          setAlert({
            open:true,
            message: `${coin.name} löschen aus der Watchlist!`,
            type: "success",
          })
      } catch (error) {
        setAlert({
          open:true,
          message: error.message,
          type: "error",
        })
      }
    }

    if (!coin) return <LinearProgress style={{ backgroundColor: "#f2a900" }} />;

  return (
    <RespoContainer>    
          <RespoSidebar>
            <img 
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20}}
            />
            <Typography  variant="h3"               //heading}
                      sx={{
                        fontWeight: "bold",
                        mb: 1.5,
                        fontFamily: "Montserrat"
                      }}
            >
                {coin?.name}
            </Typography>
            <Typography variant="subtitle1" //description
              sx={{
                width: "100%",
                fontFamily: "Montserrat",
                p: 1.7,
                pb: 1,
                pt:0,
                textAlign: "justify"
              }}
            >
                {parse(coin?.description.en.split(". ")[0])}.
            </Typography>
            <Box               //marketData}
              sx={{
                alignSelf: "start",
                p: 1.7,
                pt: 0.8,
                width: "100%", 
              }}
            >
                    <span style={{display: "flex"}}>
                        <Typography variant="h5"                //heading
                           sx={{
                            fontWeight: "bold",
                            mb: 1.5,
                            fontFamily: "Montserrat"
                          }}
                        >
                            Rank:
                        </Typography>
                            &nbsp; &nbsp;
                        <Typography vaiant="h5" 
                             sx={{
                              fontSize: "1.4rem",
                              fontFamily: "Montserrat"
                            }}>
                            {numberWithCommas(coin?.market_cap_rank)}
                        </Typography>
                    </span>
                    <span style={{display: "flex"}}>
                        <Typography variant="h5"            //heading
                           sx={{
                            fontWeight: "bold",
                            mb: 1.5,
                            fontFamily: "Montserrat"
                          }}
                        >
                            Stück Preis:
                        </Typography>
                            &nbsp; &nbsp;
                        <Typography vaiant="h5" 
                            style={{
                                fontFamily: "Montserrat",
                                fontSize: "1.4rem",
                            }}>
                           {symbol}{" "}
                            {numberWithCommas(
                            coin?.market_data.current_price[currency.toLowerCase()]
                            )}
                        </Typography>
                    </span>
                    <span style={{display: "flex"}}>
                        <Typography variant="h5"            //heading
                           sx={{
                            fontWeight: "bold",
                            mb: 1.5,
                            fontFamily: "Montserrat",
                            alignItems:"center",
                          }}
                       >
                            Gesamt Wert:
                        </Typography>
                            &nbsp; &nbsp;
                        <Typography vaiant="h5" 
                            style={{
                              fontSize: "1.4rem",
                                fontFamily: "Montserrat"
                            }}>
                           {symbol}{" "}
                            {numberWithCommas(
                            coin?.market_data.market_cap[currency.toLowerCase()]
                            .toString().slice(0, -6)
                             )}
                            M
                        </Typography>
                    </span>
                    {user && (
                      <Button
                        variant='outlined'
                        style={{
                          color:"black",
                          fontWeight:"bold",
                          width: "100%",
                          height: 40,
                          backgroundColor: "#f2a900"
                        }}
                        onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
                        >
                          
                          {inWatchlist ? "Löschen von der Watchlist" : "Hinzufügen zur Watchlist"}
                      </Button>
                    )}
            </Box>
        </RespoSidebar>
        <CoinInfo coin={coin} />
    </RespoContainer>
  )
}

export default Coinpage