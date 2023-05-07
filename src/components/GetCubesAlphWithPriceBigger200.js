import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {Container, Paper} from "@mui/material";
import TextField from "@mui/material/TextField";
import {apiaddress} from "./Home";
import Cookies from "js-cookie";

const token = Cookies.get("timo")
export default function GetCubesAlphWithPriceBigger200() {
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const [cubes, setCubes] = useState([])
    const [price, setPrice] = useState(0)


    useEffect(() => {
        if (isNaN(price)) {
            fetch(String(apiaddress) + "/cubes/stats/byAlphabetical/0")
                .then((response) => response.json())
                .then((data) => {
                    setCubes(data);
                });
            console.log(NaN)
        }
        if (price === '') {
            fetch(String(apiaddress) + "/cubes/stats/byAlphabetical/0")
                .then((response) => response.json())
                .then((data) => {
                    setCubes(data);
                });
        } else {
            fetch(String(apiaddress) + "/cubes/stats/byAlphabetical/" + String(price))
                .then((response) => response.json())
                .then((data) => {
                    setCubes(data);
                });
        }
        console.log({price});
    }, [price])

    const updatePrice = (e) => {
        console.log('update', e.target.value);
        setPrice(e.target.value);
    }
    const reloadData = () => {
        if (isNaN(price)) {
            fetch(String(apiaddress) + "/cubes/stats/byAlphabetical/0")
                .then((response) => response.json())
                .then((data) => {
                    setCubes(data);
                });
            console.log(NaN)
        }
        if (price === '') {
            fetch(String(apiaddress) + "/cubes/stats/byAlphabetical/0")
                .then((response) => response.json())
                .then((data) => {
                    setCubes(data);
                });
        } else {
            fetch(String(apiaddress) + "/cubes/stats/byAlphabetical/" + String(price))
                .then((response) => response.json())
                .then((data) => {
                    setCubes(data);
                });
        }
        console.log({price});
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
                    <h2>Show all cubes alphabetically with price > {price}</h2>
                    <TextField id="outlined-basic" label="Price" variant="outlined" required
                               value={price}
                               onChange={(e) => {
                                   updatePrice(e)
                               }}
                               type="number"
                    />
                    {cubes.map(cube => (
                        <Paper elevation={6}
                               style={{margin: "10px", padding: "15px", textAlign: "left"}} key={parseInt(cube.id)}>
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
