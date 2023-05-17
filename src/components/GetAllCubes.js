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
import {Link as FancyLink} from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {apiaddress} from "./Home";
import Cookies from "js-cookie";
import Link from '@mui/material/Link';

let i = 0;


export default function GetAllCube() {
    const [loading, setLoading] = useState(false);
    const [cubes, setCubes] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        setLoading(true);
        console.log(`timo= ${Cookies.get("timo")}`)
        fetch(String(apiaddress) + "/cubes/details/" + String(i)
            ,
            {
                headers: {
                    'Cookie': `timo= ${Cookies.get("timo")}`
                }
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setCubes(data);
                setLoading(false);
            });
    }, [i]);

    useEffect(() => {
        setLoading(true);
        fetch(String(apiaddress) + "/cubes/count"
            ,
            {
                headers: {
                    'Cookie': `timo= ${Cookies.get("timo")}`
                }
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setCount(data);
                setLoading(false);
            });
    }, [i]);

    const reloadData = () => {
        setLoading(true);
        console.log(String(apiaddress) + "/cubes/details/" + String(i))
        console.log(`Bearer ${Cookies.get("timo")}`)
        fetch(String(apiaddress) + "/cubes/details/" + String(i)
            ,
            {
                headers: {
                    'Cookie': `timo= ${Cookies.get("timo")}`
                }
            }
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

    const setPage = (page) => {
        i = page;
        reloadData();
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
            {/*<Button variant="contained" color="secondary" onClick={decPage}>*/}
            {/*    Prev Page*/}
            {/*</Button>*/}
            {/*<Button variant="contained" color="secondary" onClick={incPage}>*/}
            {/*    Next Page*/}
            {/*</Button>*/}
            <FancyLink href="#" onClick={() => {
                setPage(0);
                console.log(i)
            }}>0 </FancyLink>
            <FancyLink href="#" onClick={() => {
                setPage(1);
                console.log(i)
            }}>1 </FancyLink>
            <FancyLink href="#" onClick={() => {
                setPage(2);
                console.log(i)
            }}>2 </FancyLink>
            {/* render() {*/}
            {/*if(i>3 && i<Math.floor(count/100-3))*/}
            ...
            <FancyLink href="#" onClick={() => {
                setPage(i - 1);
                console.log(i - 1)
            }}>{i - 1} </FancyLink>
            <FancyLink href="#" onClick={() => {
                setPage(i);
                console.log(i)
            }}>{i} </FancyLink>
            <FancyLink href="#" onClick={() => {
                setPage(i + 1);
                console.log(i + 1)
            }}>{i + 1} </FancyLink>
            ...
            <FancyLink href="#" onClick={() => {
                setPage(Math.floor(count / 100 - 2));
                console.log(i)
            }}>{Math.floor(count / 100 - 2)} </FancyLink>
            <FancyLink href="#" onClick={() => {
                setPage(Math.floor(count / 100 - 1));
                console.log(i)
            }}>{Math.floor(count / 100 - 1)} </FancyLink>
            <FancyLink href="#" onClick={() => {
                setPage(Math.floor(count / 100));
                console.log(i)
            }}>{Math.floor(count / 100)}</FancyLink>
        </Container>
    );
};