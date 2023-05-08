import {
    Button,
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
import {apiaddress} from "./Home";
import Cookies from "js-cookie";

let i = 0;


export default function GetAllCube() {
    const [loading, setLoading] = useState(false);
    const [cubes, setCubes] = useState([]);

    useEffect(() => {
        setLoading(true);
        console.log(`Bearer ${Cookies.get("timo")}`)
        fetch(String(apiaddress) + "/cubes/details/" + String(i)
            // ,
            // {headers:{
            // 'Authorization': `Bearer ${Cookies.get("timo")}`}}
        )
            .then((response) => response.json())
            .then((data) => {
                setCubes(data);
                setLoading(false);
            });
    }, []);

    const reloadData = () => {
        setLoading(true);
        console.log(String(apiaddress) + "/cubes/details/" + String(i))
        fetch(String(apiaddress) + "/cubes/details/" + String(i)
            // ,
            // {
            //     headers: {
            //         'Authorization': `Bearer ${Cookies.get("timo")}`
            //     }
            // }
        )
            .then((data) => {
                setCubes(data);
                setLoading(false);
            });
    }

    const handleSort = (e) => {
        const sortedData = [...cubes].sort((a, b) => {
            return a.name > b.name ? 1 : -1
        })
        setCubes(sortedData)
    }

    const incPage = (e) => {
        i = i + 1;
        reloadData()
    }

    const decPage = (e) => {
        if (i >= 1)
            i = i - 1;
        reloadData()
    }

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
                    <Button variant="contained" color="secondary" onClick={handleSort}>
                        Sort
                    </Button>
                </div>
            )}
            {!loading && cubes.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">No. of reviews</TableCell>
                                <TableCell align="right">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cubes.map((cube, index) => (
                                <TableRow key={index + i * 100 + 1}>
                                    <TableCell component="th" scope="row">
                                        {i * 100 + index + 1}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        <Link to={`/cubes/${cube.id}/details`} title="View cube details">
                                            {cube.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {cube.reviews}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{mr: 3}}
                                            to={`/cubes/${cube.id}/details`}>
                                            <Tooltip title="View cubes details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/cubes/${cube.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/cubes/${cube.id}/delete`}>
                                            <DeleteForeverIcon sx={{color: "red"}}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Button variant="contained" color="secondary" onClick={decPage}>
                Prev Page
            </Button>
            <Button variant="contained" color="secondary" onClick={incPage}>
                Next Page
            </Button>
        </Container>
    );
};