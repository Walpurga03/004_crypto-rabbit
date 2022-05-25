import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { CryptoState } from '../../CryptoContext';
import { Avatar, Button } from '@mui/material';
import { Box } from '@mui/system';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

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


export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const {user, setAlert} = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
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
                    }}>Watchlist</span>
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
