import Carousel from './Carousel'
import { Container, Typography } from '@mui/material'
import React from 'react'

const Banner = () => {
  return (
    <div  style={{
        backgroundImage: "url(./banner2.jpg"}}>
        <Container style={{
            height: 400,
            display: "flex",
            flexDirection: "column",
            paddingTop: 25,
            justifyContent: "space-around",}}>
                <div style={{
                            display: "flex",
                            height: "40%",
                            flexDirection: "column",
                            justifyContent: "center",
                            textAlign: "center"
                            }}>
                    <Typography variant='h2'
                        style={{
                            fontWeight: "bold",
                            marginBottom: 15,
                            fontFanily: "Monserrat",
                            }}>
                            Crypto Rabbit
                    </Typography>
                    <Typography variant='subtitle2'
                        style={{
                            color: "darkgrey",
                            textTransform: "capitalize",
                            fontFanily: "Monserrat",
                            }}>
                           Informationen zu Ihrer Lieblings-Kryptowährung
                    </Typography>
                </div>
                <Carousel />
        </Container>
    </div>
  )
}

export default Banner