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
export default function GetAllCube() {
    const [loading, setLoading] = useState(false);
    const [Reviews, setReviews] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch(String(apiaddress) + '/reviews/details/' + String(i))
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
                setLoading(false);
            });
    }, [i]);

    const reloadData = () => {
        setLoading(true);
        fetch(String(apiaddress) + '/reviews/details/' + String(i))
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
                setLoading(false);
            });
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
            <h1>All Reviews</h1>

            {loading && <CircularProgress/>}
            {!loading && Reviews.length === 0 && <p>No reviews found</p>}
            {!loading && (
                <div>
                    <IconButton component={Link} sx={{mr: 3}} to={`/reviews/add`}>
                        <Tooltip title="Add a new review" arrow>
                            <AddIcon color="primary"/>
                        </Tooltip>
                    </IconButton>
                </div>
            )}
            {!loading && Reviews.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Username</TableCell>
                                <TableCell align="center">Rating</TableCell>
                                <TableCell align="center">Cube Name</TableCell>
                                <TableCell align="right">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Reviews.map((Review, index) => (
                                <TableRow key={index + i * 100 + 1}>
                                    <TableCell component="th" scope="row">
                                        {i * 100 + index + 1}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        <Link to={`/reviews/${Review.id}/details`} title="View cube details">
                                            {Review.username}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {Review.rating}
                                    </TableCell>
                                    <TableCell align="center" component="th" scope="row">
                                        {Review.cube.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            component={Link}
                                            sx={{mr: 3}}
                                            to={`/reviews/${Review.id}/details`}>
                                            <Tooltip title="View review details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/reviews/${Review.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/reviews/${Review.id}/delete`}>
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