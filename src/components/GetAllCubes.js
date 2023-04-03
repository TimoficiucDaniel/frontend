import {
    CircularProgress,
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export default function GetAllCube() {
    let i = 0;
    const [loading, setLoading] = useState(false);
    const [cubes, setCubes] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch(`http://16.16.91.213:80/cubes`)
            .then((response) => response.json())
            .then((data) => {
                setCubes(data);
                setLoading(false);
            });
    }, []);


    return (
        <Container>
            <h1>All Cubes</h1>

            {loading && <CircularProgress/>}
            {!loading && cubes.length === 0 && <p>No cubes found</p>}
            {!loading && (
                <div>
                    <IconButton component={Link} sx={{mr: 3}} to={`/cubes/add`}>
                        <Tooltip title="Add a new cube" arrow>
                            <AddIcon color="primary"/>
                        </Tooltip>
                    </IconButton>
                    <IconButton component={Link} sx={{mr: 3}} to={`/cubes/stats`}>
                        <Tooltip title="See stats" arrow>
                            <RemoveRedEyeIcon color="primary"/>
                        </Tooltip>
                    </IconButton>
                </div>
            )}
            {!loading && cubes.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Id</TableCell>
                                <TableCell align="right">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cubes.map((cube, index) => (
                                <TableRow key={cubes[index]}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        <Link to={`/cubes/${cubes[index]}/details`} title="View cube details">
                                            {cubes[index]}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{mr: 3}}
                                            to={`/cubes/${cubes[index]}/details`}>
                                            <Tooltip title="View cubes details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/cubes/${cubes[index]}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/cubes/${cubes[index]}/delete`}>
                                            <DeleteForeverIcon sx={{color: "red"}}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};