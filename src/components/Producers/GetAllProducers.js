import {
    Button,
    CircularProgress,
    Container,
    FormControl,
    IconButton,
    Paper,
    Select,
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
export default function GetAllProducers() {
    const [loading, setLoading] = useState(false);
    const [producers, setProducers] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch(String(apiaddress) + '/producers/details/' + String(i))
            .then((response) => response.json())
            .then((data) => {
                setProducers(data);
                setLoading(false);
            });
    }, [i]);

    const reloadData = () => {
        setLoading(true);
        fetch(String(apiaddress) + '/producers/details/' + String(i))
            .then((response) => response.json())
            .then((data) => {
                setProducers(data);
                setLoading(false);
            });
    }

    const handleSort = (e) => {
        const sortedData = [...producers].sort((a, b) => {
            return a.name > b.name ? 1 : -1
        })
        setProducers(sortedData)
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
            <h1>All Producers</h1>

            {loading && <CircularProgress/>}
            {!loading && producers.length === 0 && <p>No cubes found</p>}
            {!loading && (
                <div>
                    <IconButton component={Link} sx={{mr: 3}} to={`/producers/add`}>
                        <Tooltip title="Add a new producer" arrow>
                            <AddIcon color="primary"/>
                        </Tooltip>
                    </IconButton>
                </div>
            )}
            {!loading && producers.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">List of Cubes</TableCell>
                                <TableCell align="right">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {producers.map((prod, index) => (
                                <TableRow key={index + i * 100 + 1}>
                                    <TableCell component="th" scope="row">
                                        {i * 100 + index + 1}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        <Link to={`/producers/${prod.id}/details`} title="View cube details">
                                            {prod.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        <FormControl sx={{m: 1, minWidth: 120, maxWidth: 300}}>
                                            <Select
                                                multiple
                                                native
                                                label="Native"
                                                inputProps={{
                                                    id: 'select-multiple-native',
                                                }}
                                            >
                                                {prod.listOfCubes.map((name) => (
                                                    <option key={name} value={name}>
                                                        {name}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{mr: 3}}
                                            to={`/producers/${prod.id}/details`}>
                                            <Tooltip title="View cubes details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/producers/${prod.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/producers/${prod.id}/delete`}>
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