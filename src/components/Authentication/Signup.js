import { Box, Button, TextField } from '@mui/material';
import React from 'react'
import { useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import { auth } from "../../firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = (handleClose) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { setAlert } = CryptoState();
 
const handleSubmit = async () => {
    if (password !== confirmPassword) {
        setAlert({
            open:true,
            message:'Password stimmt nicht überein!',
            type:'error'
        })
        return;
    }
    try {
        const result = await createUserWithEmailAndPassword(
            auth, 
            email, 
            password
            );
            console.log(result)
            setAlert({
                open:true,
                message: `Anmeldung erfolgreich. Hallo ${result.user.email}`,
                type: "success",
            });
            
           
    }catch (error){
        setAlert({
            open:true,
            message: error.message,
            type: "error"
        })
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
                <TextField 
                variant='outlined'
                type="password"
                label="Wiederhole Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                />
                <Button
                    variant='contained'
                    size='large'
                    style={{backgroundColor: '#EEBC1D'}}
                    onClick={handleSubmit}>
                        Registrieren
                </Button>
    </Box>
  )
}

export default Signup