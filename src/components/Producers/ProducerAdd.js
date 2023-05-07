import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Textarea from '@mui/joy/Textarea';
import {Button, Container, FormControlLabel, Paper, Radio, RadioGroup, Snackbar} from "@mui/material";
import {FormControl, FormLabel} from "@mui/joy";
import {useNavigate} from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import {apiaddress} from "../Home";
import Cookies from "js-cookie";

const token = Cookies.get("timo")

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function ProducerAdd() {
    const navigate = useNavigate();
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const [name, setName] = useState('')
    const [gdp, setGdp] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = useState('error')

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const handleAdd = (e) => {
        if (phoneNumber.length !== 10) {
            setMsg('invalid phone number!!!');
            handleClick();
        } else if (name === '') {
            setMsg('name empty!!!');
            handleClick()
        } else {
            e.preventDefault()
            const producer = {name: name, address: address, phoneNumber: phoneNumber, email: email, gdp: gdp}
            console.log(producer)
            fetch(String(apiaddress) + "/producers", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(producer)
            }).then(() => {
                console.log("New producer added")
            })
            navigate("/producers")
        }
    }
    return (
        <Container>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {msg}
                </Alert>
            </Snackbar>
            <Paper elevation={3} style={paperStyle}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 2, width: '550px'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <h2>Add Producer</h2>
                    <TextField id="outlined-basic" label="Name" variant="outlined" required
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                    /><br/>
                    <TextField id="outlined-basic" label="GDP" variant="outlined" required
                               onChange={(e) => setGdp(e.target.value)}
                    /><br/>
                    <TextField id="outlined-basic" label="Address" variant="outlined" required
                               value={address}
                               onChange={(e) => setAddress(e.target.value)}
                    /><br/>
                    <TextField id="outlined-basic" label="Phone Number" variant="outlined" required
                               value={phoneNumber}
                               onChange={(e) => setPhoneNumber(e.target.value)}
                    /><br/>
                    <TextField id="outlined-basic" label="Email" variant="outlined" required
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                    /><br/>
                </Box>
                <Button variant="contained" color="secondary" onClick={handleAdd}>
                    Add
                </Button>
            </Paper>
        </Container>
    );
}
