import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container, Paper} from "@mui/material";
import {useParams} from "react-router-dom";
import {apiaddress} from "./Home";
import Cookies from "js-cookie";

const token = Cookies.get("timo")
export default function GetCubeById() {
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const {cubeId} = useParams()
    const [id, setId] = useState(cubeId)
    const [cube, setCube] = useState('')
    const [review, setReview] = useState([])

    useEffect(() => {
        fetch(String(apiaddress) + "/cubes/" + String(cubeId))
            .then(res => res.json())
            .then((result) => {
                setCube(result);
                setReview(result.reviews)
            });
    }, []);

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 2, width:'550px'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <h2>Get Cube by Id</h2>
                    <TextField id="outlined-basic" label="Id" variant="outlined" required
                               value={id}
                               disabled
                    /><br/>
                </Box>
                <Paper elevation={6}
                       style={{margin: "10px", padding: "15px", textAlign: "left"}} key={parseInt(cube.id)}>
                    Id:{parseInt(cube.id)}<br/>
                    Name:{cube.name}<br/>
                    Price:{parseInt(cube.price)}<br/>
                    Type:{cube.type}<br/>
                    Description:{cube.description}<br/>
                    Magnetic:{String(cube.magnetic)}<br/>
                    Reviews:
                    {review.map(rev => (
                        <Paper elevation={6}
                               style={{margin: "10px", padding: "15px", textAlign: "left"}} key={parseInt(cube.id)}>
                            Username: {rev.username}<br/>
                            Description: {rev.description}<br/>
                            Rating: {rev.rating}<br/>
                            Date: {rev.date}<br/>
                            Recommend: {String(rev.recommend)}
                        </Paper>
                    ))}
                </Paper>
            </Paper>
        </Container>
    );
}
