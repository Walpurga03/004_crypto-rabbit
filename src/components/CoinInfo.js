import { createTheme, ThemeProvider } from '@mui/system';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { HistoricalChart } from '../config/api';
import { CryptoState } from "../CryptoContext"
import { CircularProgress} from '@mui/material';
import { Line } from 'react-chartjs-2';
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';
import { Chart as ChartJS, registerables } from 'chart.js';
import { styled } from "@mui/material/styles"
ChartJS.register(...registerables);

const RespoContainer = styled('div')(({theme}) => ({
  [theme.breakpoints.down('md')]: {
   width:"100%"
  }
}))

const CoinInfo = ( {coin}) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [flag,setflag] = useState(false);
  const { currency } =  CryptoState();
  
  useEffect(() => {
    const fetchHistoriclData = async () => {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setflag(true);
      setHistoricData(data.prices)
    }
    fetchHistoriclData();
  }, [coin.id,currency,days])

    const darkTheme = createTheme({
      palette: {
        primary: {
          main: '#fff'
        },
        type: "dark",
      }
    })
  return (
    <ThemeProvider theme={darkTheme}>
     
      <RespoContainer            //container               
          sx={{
            width: "75%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 1.8,
            p:3,
          }}
      >
        {!historicData | flag===false ? (
          <CircularProgress style={{color: "gold"}}
                                    size={250}
                                    thickness={1} />
        ):(<>
            <Line 
              data={{labels:historicData.map(coin => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() -12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
              return days===1?time:date.toLocaleDateString()
              }),
              datasets: [
                {
                  data:historicData.map((coin) => coin[1]),
                  label: `Preis ( Letzten ${days} Tage ) in ${currency}`,
                  borderColor: "#f2a900",
                }
              ]
            }}
            options={{
                elements:{
                  point:{
                    radius: 1,
                  },
                },
            }}
            />
            <div style={{
                  display:"flex",
                  marginTop: 20,
                  justifyContent: "space-around",
                  width: "100%"
            }}>
            {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
        </>)
      }
      </RespoContainer>
    </ThemeProvider>
  )
}

export default CoinInfo