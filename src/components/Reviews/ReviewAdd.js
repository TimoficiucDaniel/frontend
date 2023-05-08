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
    const [Username, setUsername] = useState('')
    const [rating, setRating] = useState('')
    const [Description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [recommend, setRecommend] = useState('')
    const [cube, setCube] = useState(null)
    const [cubelist, setCubeList] = useState([])
    const [search, setSearch] = useState('')


    useEffect(() => {
        if (search !== '')
            fetch(String(apiaddress) + "/cubes/autocomplete/" + String(search))
                .then((response) => response.json())
                .then((data) => {
                    setCubeList(data);
                });
    }, [search]);

    const updateSearch = (e) => {
        console.log('search', e.target.value);
        setSearch(e.target.value);
    }

    const handleAdd = (e) => {
        e.preventDefault()
        console.log(cube.replace(/^.*\|{1}/g, ''));
        const review = [{
            username: Username,
            description: Description,
            rating: rating,
            date: date,
            recommend: recommend
        }];
        fetch(String(apiaddress) + "/cubes/" + String(cube.replace(/^.*\|{1}/g, '')) + "/review", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(review)
        }).then(() => {
            console.log("New review added")
        })
        navigate("/reviews")
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
                    <h2>Add Review</h2>
                    <TextField id="outlined-basic" label="Username" variant="outlined" required
                               value={Username}
                               onChange={(e) => setUsername(e.target.value)}
                    /><br/>
                    <TextField id="outlined-basic" label="Rating" variant="outlined" required
                               onChange={(e) => setRating(e.target.value)}

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
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            id="outlined-basic"
                            label="Description"
                            variant="outlined"
                            required
                            sx={{left: '9px', height: '200px'}}
                            placeholder="Type here..."
                            value={Description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormControl><br/>
                    <FormControl>
                        <FormLabel id="radioId">Recommend?</FormLabel>
                        <RadioGroup
                            aria-labelledby="radioId"
                            name="radiobuttongroup"
                            value={recommend}
                            onChange={(e) => setRecommend(e.target.value)}
                            required
                        >
                            <FormControlLabel value='true' control={<Radio/>} label="Yes"/>
                            <FormControlLabel value='false' control={<Radio/>} label="No"/>
                        </RadioGroup>
                    </FormControl>
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
                </Box>
                <Button variant="contained" color="secondary" onClick={handleAdd}>
                    Add
                </Button>
            </Paper>
        </Container>
    );
}
