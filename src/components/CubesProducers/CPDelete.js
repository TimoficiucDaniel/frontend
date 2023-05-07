import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Container, Paper} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {apiaddress} from "../Home";
import Cookies from "js-cookie";

const token = Cookies.get("timo")
export default function CPDelete() {
    const navigate = useNavigate();
    const {cpId} = useParams()
    const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
    const [id, setId] = useState(cpId)

    const handleDelete = (e) => {
        e.preventDefault()
        fetch(String(apiaddress) + "/cubes_producers/" + parseInt(id)
            //     , {
            //     method: "DELETE",
            //     headers:{
            //     'Authorization': `Bearer ${token}`
            //     }
            // }
        )
            .then(() => this.setState({status: "Delete successful"}));
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
                    <h2>Delete Cube Producer Relation by Id</h2>
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
