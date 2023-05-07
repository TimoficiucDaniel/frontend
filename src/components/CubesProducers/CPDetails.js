import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container, Paper} from "@mui/material";
import {useParams} from "react-router-dom";
import {apiaddress} from "../Home";
import Cookies from "js-cookie";

const token = Cookies.get("timo")
export default function CPDetails() {
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const {cpId} = useParams()
    const [id, setId] = useState(cpId)
    const [cube, setCube] = useState('')
    const [producer, setProducer] = useState('')
    const [cp, setCp] = useState('')

    useEffect(() => {
        fetch(String(apiaddress) + "/cubes_producers/" + String(cpId)
            // ,
            // {headers:{
            //         'Authorization': `Bearer ${token}`
            //     }}
        )
            .then(res => res.json())
            .then((result) => {
                setCp(result);
                setProducer(result.producer);
                setCube(result.cube);
            });
    }, []);

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
                    <h2>Cube Producer </h2>
                    <TextField id="outlined-basic" label="Id" variant="outlined" required
                               value={id}
                               disabled
                    /><br/>
                </Box>
                <Paper elevation={6}
                       style={{margin: "10px", padding: "15px", textAlign: "left"}} key={parseInt(cp.id)}>
                    Cube Id:{cube.id}<br/>
                    Cube Name:{cube.name}<br/>
                    Cube Type:{cube.type}<br/> <br/>

                    Producer Id:{producer.id}<br/>
                    Producer name:{producer.name}<br/> <br/>

                    Quantity:{parseInt(cp.quantity)}<br/>
                    Date of Purchase:{cp.date}
                </Paper>
            </Paper>
        </Container>
    );
}
