import {Container, CssBaseline, Typography} from "@mui/material";
import React from "react";
import Cookies from "js-cookie";

const token = Cookies.get("timo")

export const Home = () => {
    return (
        <React.Fragment>
            <CssBaseline/>

            <Container maxWidth="xl">
                <Typography variant="h2" component="h2" gutterBottom>
                    Welcome to the app! placeholder
                </Typography>
            </Container>
        </React.Fragment>
    );
};

export const apiaddress = "https://incercaredeacasa3.jumpingcrab.com"