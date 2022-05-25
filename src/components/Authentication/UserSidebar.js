import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { CryptoState } from '../../CryptoContext';
import { Avatar, Button } from '@mui/material';
import { Box } from '@mui/system';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { numberWithCommas } from '../Banner/Carousel';
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';



const container = {
  width: 350,
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
  backgroundColor: "#EEBC1D",
  objectFit: "contain"
}
const logout ={
  height: "8%",
  width: "100%",
  backgroundColor: "#EEBC1D",
  margin: "2"
}
const watchlist = {
  flex:1,
  width: "100%",
  backgroundColor: "gray",
  borderRadius:2,
  padding:1,
  flexDirection:"column",
  alignItems: "center",
  gap: 12,
  overflowY: "scroll"
}
const watchlistCoin = {
  padding: 0.8,
  borderRadius: 1,
  color: "black",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#EEBC1D",
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
          message: `${coin.name} Removed to the Watchlist !`,
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
      message: "Lougout Successfull !"
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
                  <Box sx={watchlist}>
                    <span style={{
                      fontSize:15,
                      textShadow: "0 0 5px black"
                    }}>Watchlist
                    </span>
                    {coins.map((coin) => {
                      if ((watchlist || '').includes(coin.id))
                      return(
                        <Box sx={watchlistCoin}>
                          <span>{coin.name}</span>
                          <span style={{display: "flex", gap:8}}>
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete 
                              style={{curser: "pointer"}}
                              fontsize="16"
                              onClick={() => removeFromWatchlist(coin)} 
                              />
                          </span>
                        </Box>
                      )
                    })}
                  </Box>
                </Box>
                <Button 
                  variant='containd'
                  sx={logout}
                  onClick={logOut}>
                    Logout
                </Button>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
