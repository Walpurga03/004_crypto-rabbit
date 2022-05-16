
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CoinInfo from '../components/CoinInfo';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { Box, LinearProgress, Typography } from  '@mui/material';
import parse from 'html-react-parser'
import { numberWithCommas } from '../components/Banner/Carousel';


const Coinpage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const { currency, symbol } =CryptoState();

    
    
    useEffect(() => {
      const fetchCoin = async() => {
        const { data } = await axios.get(SingleCoin(id));

        setCoin(data);
    };
        fetchCoin();

    }, [id]);

    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <Box sx={{display:"flex"}} //container              
         >    
          <Box sx={{            //sidebar 
            width: "50%",
            display:"flex",
            flexDirection: "column",
            alignItems: "center",
            borderRight: "2px solid grey"
          }}                   
          >
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
                width: "100%"
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
                            Current Price:
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
                            fontFamily: "Montserrat"
                          }}
                       >
                            Market Cap:
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
            </Box>
        </Box>
        <CoinInfo coin={coin} />
    </Box>
  )
}

export default Coinpage