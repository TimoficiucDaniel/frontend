import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {Container, Paper} from "@mui/material";

export default function GetCubesAlphWithPriceBigger200() {
    const paperStyle = {padding:'50px 20px',width:600,margin:'20px auto'}
    const[cubes,setCubes]=useState([])


    useEffect(()=>{
        fetch("http://16.16.91.213:80/cubes/stats/byAlphabetical")
            .then(res=>res.json())
            .then((result)=>{
            setCubes(result);
        })
    },[])

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
                    <h2>Show all cubes alphabetically with price > 200</h2>
                    {cubes.map(cube=>(
                        <Paper elevation={6}
                               style={{margin:"10px",padding:"15px",textAlign:"left"}} key={parseInt(cube.id)}>
                            Id:{parseInt(cube.id)}<br/>
                            Name:{cube.name}<br/>
                            Price:{parseInt(cube.price)}<br/>
                            Type:{cube.type}<br/>
                            Description:{cube.description}<br/>
                            Magnetic:{String(cube.magnetic)}
                        </Paper>
                    ))}
                </Box>
            </Paper>
        </Container>
    );
}
