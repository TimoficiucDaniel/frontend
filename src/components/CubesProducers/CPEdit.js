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
export default function CPEdit() {
    const {cpId} = useParams()
    const navigate = useNavigate()
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const [id, setId] = useState(cpId)
    const [quantity, setQuantity] = useState('')
    const [date, setDate] = useState('')

    const handleUpdate = (e) => {
        e.preventDefault()
        const cp = {id, quantity: quantity, date: date}
        console.log(cp)
        fetch(String(apiaddress) + "/cubes_producers/" + String(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
                // ,
                // 'Authorization': `Bearer ${token}`
            }
            ,
            body: JSON.stringify(cp)
        }).then(() => {
            console.log("Cube Producer Relations updated")
        })
        navigate("/cp")
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
                    <TextField id="outlined-basic" label="Quantity" variant="outlined"
                               value={quantity}
                               onChange={(e) => setQuantity(e.target.value)}
                    /><br/>
                    <FormControl>
                        <FormLabel>Date</FormLabel>
                        <TextField id="outlined-basic" variant="outlined"
                                   value={date}
                                   type="date"
                                   onChange={(e) => setDate(e.target.value)}
                        />
                    </FormControl><br/>
                </Box>
                <Button variant="contained" color="secondary" onClick={handleUpdate}>
                    Update
                </Button>
            </Paper>
        </Container>
    );
}
