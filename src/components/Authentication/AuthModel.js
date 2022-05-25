import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { AppBar, Tab, Tabs } from '@mui/material';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { CryptoState } from '../../CryptoContext';
import { auth } from "../../firebase"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};
const google = {
  padding: 2.2,
  paddingTop: 0,
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  gap: 3,
  fontSize: 20,
}

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { setAert } = CryptoState();

  const googleProvider = new GoogleAuthProvider()

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then(res => {
      setAert({
        open: true,
        message: `Sign Up Successful. Wlcome ${res.user.email}`,
        type: "success"
      })
    }).catch(error => {
      setAert({
        open: true,
        message: error.message,
        type: "error",
      })
    })
  }
  return (
    <div>
      <Button 
        variant='contained'
        style={{
            width: 85,
            height: 40,
            backgroundColor: '#EEBC1D',
        }} onClick={handleOpen}>Login</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
           <AppBar position='static' 
                    style={{ backgroundColor: "transparent", color: "white"}}>
                <Tabs 
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    style={{ borderRadius: 10 }}
                    >
                        <Tab label='Login'/>
                        <Tab label='Sign Up'/>
                </Tabs>
           </AppBar>
           {value===0 && <Login handleClose={handleClose} />}
           {value===1 && <Signup handleClose={handleClose}/>}
           <Box sx={google}>
             <span style={{color:"white"}}>OR</span>
             <GoogleButton
             style={{width: "100%", outline: "none"}}
             onClick={signInWithGoogle}>

             </GoogleButton>
           </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
