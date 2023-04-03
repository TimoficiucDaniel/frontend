import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Textarea from '@mui/joy/Textarea';
import {Button, Container, FormControlLabel, Paper, Radio, RadioGroup} from "@mui/material";
import {FormControl, FormLabel} from "@mui/joy";
import {useNavigate, useParams} from "react-router-dom";

export default function UpdateCube() {
    const {cubeId} = useParams()
    const navigate = useNavigate()
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const [id, setId] = useState(cubeId)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    const [magnetic, setMagnetic] = useState('')

    const handleUpdate = (e) => {
        e.preventDefault()
        const cube={id,type,price,name,description,magnetic}
        console.log(cube)
        fetch("http://16.16.91.213:80/cubes/" + String(id), {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(cube)
        }).then(() => {
            console.log("Cube updated")
        })
        navigate("/cubes")
    }
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
                    <h2>Update Cube</h2>
                    <TextField id="outlined-basic" label="Id" variant="outlined"
                               value={id}
                               disabled
                    /><br/>
                    <TextField id="outlined-basic" label="Name" variant="outlined"
                               value={name}
                               onChange={(e)=>setName(e.target.value)}
                    /><br/>
                    <TextField id="outlined-basic" label="Price" variant="outlined"
                               onChange={(e)=>setPrice(parseInt(e.target.value))}
                    /><br/>
                    <TextField id="outlined-basic" label="Type" variant="outlined"
                               value={type}
                               onChange={(e)=>setType(e.target.value)}
                    /><br/>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            id="outlined-basic"
                            label="Description"
                            variant="outlined"
                            required
                            sx={{ left:'9px', height:'200px' }}
                            placeholder="Type here..."
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                        />
                    </FormControl><br/>
                    <FormControl>
                        <FormLabel id="radioId">Magnetic?</FormLabel>
                        <RadioGroup
                            aria-labelledby="radioId"
                            name="radiobuttongroup"
                            value={magnetic}
                            onChange={(e)=>setMagnetic(e.target.value)}
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
