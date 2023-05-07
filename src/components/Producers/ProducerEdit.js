import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Textarea from '@mui/joy/Textarea';
import {Button, Container, FormControlLabel, Paper, Radio, RadioGroup} from "@mui/material";
import {FormControl, FormLabel} from "@mui/joy";
import {useNavigate, useParams} from "react-router-dom";
import {apiaddress} from "../Home";
import Cookies from "js-cookie";

const token = Cookies.get("timo")
export default function ProducerEdit() {
    const {producerId} = useParams()
    const navigate = useNavigate()
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const [id, setId] = useState(producerId)
    const [name, setName] = useState('')
    const [gdp, setGdp] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')

    const handleUpdate = (e) => {
        e.preventDefault()
        const producer = {id, name: name, address: address, phoneNumber: phoneNumber, email: email, gdp: gdp}
        console.log(producer)
        fetch(String(apiaddress) + "/producers/" + String(id), {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(producer)
        }).then(() => {
            console.log("Producer updated")
        })
        navigate("/producers")
    }
    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 2, width: '550px'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <h2>Update Cube</h2>
                    <TextField id="outlined-basic" label="Id" variant="outlined"
                               value={id}
                               disabled
                    /><br/>
                    <TextField id="outlined-basic" label="Name" variant="outlined"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                    /><br/>
                    <TextField id="outlined-basic" label="GDP" variant="outlined"
                               onChange={(e) => setGdp(parseInt(e.target.value))}
                    /><br/>
                    <TextField id="outlined-basic" label="Address" variant="outlined"
                               value={address}
                               onChange={(e) => setAddress(e.target.value)}
                    /><br/>
                    <TextField id="outlined-basic" label="Phone Number" variant="outlined"
                               value={phoneNumber}
                               onChange={(e) => setPhoneNumber(e.target.value)}
                    /><br/>
                    <TextField id="outlined-basic" label="Email" variant="outlined"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                    /><br/>
                </Box>
                <Button variant="contained" color="secondary" onClick={handleUpdate}>
                    Update
                </Button>
            </Paper>
        </Container>
    );
}
