import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Textarea from '@mui/joy/Textarea';
import {Autocomplete, Button, Container, FormControlLabel, Paper, Radio, RadioGroup} from "@mui/material";
import {FormControl, FormLabel} from "@mui/joy";
import {useNavigate} from "react-router-dom";
import {apiaddress} from "../Home";
import Cookies from "js-cookie";

const token = Cookies.get("timo")
export default function ReviewAdd() {
    const navigate = useNavigate();
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const [quantity, setQuantity] = useState('')
    const [date, setDate] = useState('')
    const [cube, setCube] = useState('')
    const [producer, setProducer] = useState('')
    const [cubeObj, setCubeObj] = useState('')
    const [producerObj, setProducerObj] = useState('')
    const [cubelist, setCubeList] = useState([])
    const [producerList, setProducerList] = useState([])
    const [cubeSearch, setCubeSearch] = useState('')
    const [producerSearch, setProducerSearch] = useState('')


    useEffect(() => {
        if (cubeSearch !== '')
            fetch(String(apiaddress) + `/cubes/autocomplete/` + String(cubeSearch)
                //     ,
                //     {headers:{
                //     'Authorization': `Bearer ${token}`
                // }}
            )
                .then((response) => response.json())
                .then((data) => {
                    setCubeList(data);
                });
    }, [cubeSearch]);

    useEffect(() => {
        if (producerSearch !== '')
            fetch(String(apiaddress) + `/producers/autocomplete/` + String(producerSearch),
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    setProducerList(data);
                });
    }, [producerSearch]);

    useEffect(() => {
        if (cube !== '')
            fetch(String(apiaddress) + "/cubes/" + String(cube.replace(/^.*\|{1}/g, '')),
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => res.json())
                .then((result) => {
                    setCubeObj(result);
                });
    }, [cube]);

    useEffect(() => {
        if (producer !== '')
            fetch(String(apiaddress) + "/producers/" + String(producer.replace(/^.*\|{1}/g, '')),
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => res.json())
                .then((result) => {
                    setProducerObj(result);
                });
    }, [producer]);

    const updateSearch = (e) => {
        console.log('search', e.target.value);
        setCubeSearch(e.target.value);
    }

    const handleAdd = (e) => {
        e.preventDefault();
        console.log(cubeObj.id, producerObj.id);
        const cp = {quantity: quantity, date: date, cube: cubeObj, producer: producerObj};
        fetch(String(apiaddress) + "/cubes_producers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(cp)
        }).then(() => {
            console.log("New cp added")
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
                    <h2>Add Cube Producer Relation</h2>
                    <TextField id="outlined-basic" label="Quantity" variant="outlined" required
                               onChange={(e) => setQuantity(e.target.value)}

                    /><br/>
                    <FormControl>
                        <FormLabel>Date</FormLabel>
                        <TextField id="outlined-basic" variant="outlined" required
                                   value={date}
                                   type="date"
                                   onChange={(e) => setDate(e.target.value)}
                        />
                    </FormControl><br/>
                    <FormControl>
                        <FormLabel id="radioId">Cube</FormLabel>
                        <Autocomplete
                            disablePortal
                            value={cube}
                            onInputChange={(e, newInput) => {
                                setCube(newInput);
                                console.log(newInput)
                            }}
                            id="combo-box-demo"
                            options={cubelist.map((cube) => (String(cube.name) + "|" + String(cube.id)))}
                            sx={{width: 300}}
                            renderInput={(params) => <TextField {...params}
                                                                onInput={(e) => {
                                                                    updateSearch(e)
                                                                }}/>}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel id="radioId">Producer</FormLabel>
                        <Autocomplete
                            disablePortal
                            value={producer}
                            onInputChange={(e, newInput) => {
                                setProducer(newInput);
                                console.log(newInput)
                            }}
                            id="combo-box-demo"
                            options={producerList.map((producer) => (String(producer.name) + "|" + String(producer.id)))}
                            sx={{width: 300}}
                            renderInput={(params) => <TextField {...params}
                                                                onInput={(e) => {
                                                                    setProducerSearch(e.target.value)
                                                                }}/>}
                        />
                    </FormControl>
                </Box>
                <Button variant="contained" color="secondary" onClick={handleAdd}>
                    Add
                </Button>
            </Paper>
        </Container>
    );
}
