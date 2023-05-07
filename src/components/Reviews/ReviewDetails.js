import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container, Paper} from "@mui/material";
import {useParams} from "react-router-dom";
import {apiaddress} from "../Home";
import Cookies from "js-cookie";

const token = Cookies.get("timo")
export default function ReviewDetails() {
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const {reviewId} = useParams()
    const [id, setId] = useState(reviewId)
    const [rev, setRev] = useState('')
    const [cube, setCube] = useState([])

    useEffect(() => {
        fetch(String(apiaddress) + "/reviews/" + String(reviewId))
            .then(res => res.json())
            .then((result) => {
                setRev(result);
                setCube(result.cube)
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
                    <h2>Review Details</h2>
                    <TextField id="outlined-basic" label="Id" variant="outlined" required
                               value={id}
                               disabled
                    /><br/>
                </Box>
                <Paper elevation={6}
                       style={{margin: "10px", padding: "15px", textAlign: "left"}} key={parseInt(rev.id)}>
                    Id:{parseInt(rev.id)}<br/>
                    Username:{rev.username}<br/>
                    Rating:{parseInt(rev.rating)}<br/>
                    Date:{rev.date}<br/>
                    Description:{rev.description}<br/>
                    Recommend:{String(rev.recommend)}<br/>
                    Cube:
                    <Paper elevation={6}
                           style={{margin: "10px", padding: "15px", textAlign: "left"}} key={parseInt(rev.id)}>
                        Id: {cube.id}<br/>
                        Name: {cube.name}<br/>
                        Price: {cube.price}<br/>
                        Type: {cube.type}<br/>
                        Description: {cube.description}<br/>
                        Magnetic: {String(rev.magnetic)}
                    </Paper>
                </Paper>
            </Paper>
        </Container>
    );
}
