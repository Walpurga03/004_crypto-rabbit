import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { CryptoState } from '../../CryptoContext';
import { autocompleteClasses, Avatar, Button } from '@mui/material';
import { Box } from '@mui/system';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';


let btcWert = "";
const anzahl= 0.01;
const heute = new Date();

const container = {
  width: 700,
  padding: 3,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  fontFamily: "monospace"
};
const profile = {
  flex:1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  height: "92%",
};
const picture = {
  width: 200,
  height: 200,
  cursor: "pointer",
  backgroundColor: "#f2a900",
  objectFit: "contain"
}
const logout ={
  height: "8%",
  width: "100%",
  backgroundColor: "#f2a900",
  margin: "2"
}
const watchlistStyles = {
  flex:1,
  width: "100%",
  backgroundColor: "gray",
  borderRadius:2,
  padding:1,
  flexDirection:"column",
  alignItems: "center",
  justifyContent:"center",
  gap: 12,
  overflowY: "scroll"
}
const watchlistCoin = {
  padding: 0.8,
  marginTop: 1, 
  fontSize:20,
  borderRadius: 1,
  color: "black",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#EEBC1D",
  boxShadow: "0 0 3px black",
}
const bitcoinListGes = {
  position: 'absolute',
  bottom: 135,
  zIndex: 'tooltip',
  padding: 0.8,
  fontSize:20,
  borderRadius: 1,
  color: "black",
  width: "88%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "green",
  boxShadow: "0 0 3px black",
}

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const {user, setAlert, watchlist, coins, symbol } = CryptoState();
  

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinRef,
        {coins: watchlist.filter((watch) => watch !== coin?.id)},
        {merge:'true'})
        setAlert({
          open:true,
          message: `${coin.name} wurde von der Watchlist gelöscht!`,
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


  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Abmelden Erfolgreich !"
    })
  }
  toggleDrawer();

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
            <Avatar onClick={toggleDrawer(anchor, true)} 
                style={{
                    height: 38,
                    width: 38,
                    cursor: "pointer",
                    backgroundColor: "#EEBC1D"
                }}
                src={user.photoURL}
                alt={user.displayName || user.eamil}
            />

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Box sx={container}>
                <Box sx={profile}>
                <Avatar sx={picture}
                   src={user.photoURL}
                   alt={user.displayName || user.eamil} 
                  />
                  <span style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word"}}
                  >
                    {user.displayName || user.email}
                  </span>
                  <Box sx={watchlistStyles}>
                    <span style={{
                      fontSize:25,
                      textShadow: "0 0 5px black",
                      display: "flex",
                      justifyContent:"center",  
                      color:"white"    
                    }}>Bitcoin-list
                    </span>
                    {coins.map((coin) => {
                      console.log(coin)
                       btcWert = (anzahl * (parseInt(coin.current_price))).toFixed(2)
                      if ((watchlist || '').includes(coin.id)
                      )
                      return(
                        <div>
                          <Box sx={watchlistCoin}>
                            <span style={{display: "flex", gap:8}}>
                              {coin.symbol+" "}
                              {anzahl}
                            </span>
                            <span>{"2022-05"}</span>
                            <span style={{display: "flex", gap:8}}>
                              {symbol}
                              {btcWert}
                            </span>
                          </Box>
                          <Box sx={bitcoinListGes}>
                          <span style={{display: "flex", gap:8}}>
                              {coin.symbol+" "}
                              {anzahl}
                            </span>
                            <span>{"Gesamt"}</span>
                            <span style={{display: "flex", gap:8}}>
                              {symbol}
                              {btcWert}
                            </span>
                          </Box>
                        </div>
                      )
                    })}
                  </Box>
                </Box>
                <Button style={{color:"black", fontWeight:"bold"}}
                  variant='containd'
                  sx={logout}
                  onClick={logOut}>
                    Abmelden
                </Button>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
