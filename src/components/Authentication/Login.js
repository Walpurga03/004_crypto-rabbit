import React from 'react'
import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { CryptoState } from '../../CryptoContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const Login = ({handleClose}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setAlert } = CryptoState();

    const handleSubmit = async () => {
      if (!email || !password) {
          setAlert({
              open:true,
              message:'Bitte füllen Sie alle Felder aus!',
              type:'error'
          });
          return;
        }
        try {
          const result = await signInWithEmailAndPassword(auth, email, password);

          setAlert({
            open:true,
            message: `Anmeldung erfolgreich. Hallo ${result.user.email}`,
            type: "success",
        });
        } catch (error) {
          setAlert({
            open:true,
            message: error.message,
            type: "error"
          });
        }
      };
      return (
    <Box p={3}
    style={{ display: "flex", flexDirection: "column", gap: "20px"}}>
        <TextField 
            variant='outlined'
            type="email"
            label="Eingabe Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            />
        <TextField 
            variant='outlined'
            type="password"
            label="Eingabe Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            />
            <Button
                variant='contained'
                size='large'
                style={{backgroundColor: '#f2a900'}}
                onClick={handleSubmit}>
                    Anmelden
            </Button>
</Box>
    
  )
}

export default Login