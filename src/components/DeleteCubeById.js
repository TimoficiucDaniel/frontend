import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Container, Paper} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";

export default function DeleteCubeById() {
    const navigate = useNavigate();
    const {cubeId} = useParams()
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const [id, setId] = useState(cubeId)

    const handleDelete = (e) => {
        e.preventDefault()
        fetch("http://16.16.91.213:80/cubes/" + parseInt(id), {
            method: "DELETE"
        })
            .then(() => this.setState({status: "Delete successful"}));
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
                    <h2>Delete Cube by Id</h2>
                    <TextField id="outlined-basic" label="Id" variant="outlined" required
                               value={id}
                               disabled
                    /><br/>
                </Box>
                <Button variant="contained" color="secondary" onClick={handleDelete}>
                    Delete
                </Button>
            </Paper>
        </Container>
    );
}
