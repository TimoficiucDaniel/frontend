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
export default function ReviewEdit() {
    const {reviewId} = useParams()
    const navigate = useNavigate()
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const [id, setId] = useState(reviewId)
    const [username, setUsername] = useState('')
    const [rating, setRating] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [recommend, setRecommend] = useState('')

    const handleUpdate = (e) => {
        e.preventDefault()
        const cube = {
            id,
            date: date,
            rating: rating,
            username: username,
            description: description,
            recommend: recommend
        }
        console.log(cube)
        fetch(String(apiaddress) + "/reviews/" + String(id), {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(cube)
        }).then(() => {
            console.log("Review updated")
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
                    <h2>Update Cube</h2>
                    <TextField id="outlined-basic" label="Id" variant="outlined"
                               value={id}
                               disabled
                    /><br/>
                    <TextField id="outlined-basic" label="Username" variant="outlined"
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                    /><br/>
                    <TextField id="outlined-basic" label="Rating" variant="outlined"
                               onChange={(e) => setRating(parseInt(e.target.value))}
                    /><br/>
                    <FormControl>
                        <FormLabel>Date</FormLabel>
                        <TextField id="outlined-basic" variant="outlined"
                                   type="date"
                                   value={date}
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
                            value={description}
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
                </Box>
                <Button variant="contained" color="secondary" onClick={handleUpdate}>
                    Update
                </Button>
            </Paper>
        </Container>
    );
}
