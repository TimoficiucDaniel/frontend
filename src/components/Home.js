import {Container, CssBaseline, Typography} from "@mui/material";
import React from "react";

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