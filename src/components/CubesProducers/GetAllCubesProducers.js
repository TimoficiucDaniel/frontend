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
import {apiaddress} from "../Home";
import Cookies from "js-cookie";

let i = 0;

const token = Cookies.get("timo")
export default function GetAllCubesProducers() {
    const [loading, setLoading] = useState(false);
    const [cps, setCps] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch(String(apiaddress) + '/cubes_producers/details/' + String(i))
            .then((response) => response.json())
            .then((data) => {
                setCps(data);
                setLoading(false);
            });
    }, [i]);

    const reloadData = () => {
        setLoading(true);
        fetch(String(apiaddress) + '/cubes_producers/details/' + String(i))
            .then((response) => response.json())
            .then((data) => {
                setCps(data);
                setLoading(false);
            });
    }

    const handleSort = (e) => {
        const sortedData = [...cps].sort((a, b) => {
            return a.name > b.name ? 1 : -1
        })
        setCps(sortedData)
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
            <h1>All Cube Producer Relations</h1>

            {loading && <CircularProgress/>}
            {!loading && cps.length === 0 && <p>No cubes-producers relations found</p>}
            {!loading && (
                <div>
                    <IconButton component={Link} sx={{mr: 3}} to={`/cp/add`}>
                        <Tooltip title="Add a new cubes-producers relations" arrow>
                            <AddIcon color="primary"/>
                        </Tooltip>
                    </IconButton>
                </div>
            )}
            {!loading && cps.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Cube Name</TableCell>
                                <TableCell align="center">Producer Name</TableCell>
                                <TableCell align="right">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cps.map((cp, index) => (
                                <TableRow key={index + i * 100 + 1}>
                                    <TableCell component="th" scope="row">
                                        {i * 100 + index + 1}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        <Link to={`/cubes/${cp.cube.id}/details`} title="View cube details">
                                            {cp.cube.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        <Link to={`/producers/${cp.producer.id}/details`} title="View producer details">
                                            {cp.producer.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{mr: 3}}
                                            to={`/cp/${cp.id}/details`}>
                                            <Tooltip title="View cube-producer details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/cp/${cp.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/cp/${cp.id}/delete`}>
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