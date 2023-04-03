import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {Link, useLocation} from "react-router-dom";


export default function AppMenu() {
    const location = useLocation();
    const path = location.pathname;

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{marginBottom: "20px"}}>
                <Toolbar>
                    <IconButton
                        component={Link}
                        to="/"
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="school"
                        sx={{mr: 2}}>

                    </IconButton>
                    <Typography variant="h6" component="div" sx={{mr: 5}}>
                        Cube Management
                    </Typography>
                    <Button
                        variant={path.startsWith("/cubes") ? "outlined" : "text"}
                        to="/cubes"
                        component={Link}
                        color="inherit"
                        sx={{mr: 5}}
                    >
                        Cubes
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};