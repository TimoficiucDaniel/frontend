import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import Cookies from "js-cookie";

const token = Cookies.get("timo")
export default function AppMenu() {
    const location = useLocation();
    const path = location.pathname;

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{marginBottom: "20px"}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{mr: 5}}>
                        Cube Management
                    </Typography>
                    <Button
                        to="/cubes"
                        component={Link}
                        color="inherit"
                        sx={{mr: 5}}
                    >
                        Cubes
                    </Button>
                    <Button
                        to="/reviews"
                        component={Link}
                        color="inherit"
                        sx={{mr: 5}}
                    >
                        Reviews
                    </Button>
                    <Button
                        to="/producers"
                        component={Link}
                        color="inherit"
                        sx={{mr: 5}}
                    >
                        Producers
                    </Button>
                    <Button
                        to="/cp"
                        component={Link}
                        color="inherit"
                        sx={{mr: 5}}
                    >
                        Cubes-Producers (idk what to name it)
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};