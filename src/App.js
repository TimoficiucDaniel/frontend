import './App.css';
import AddCube from "./components/AddCube";
import GetCubesAlphWithPriceBigger200 from "./components/GetCubesAlphWithPriceBigger200";
import GetAllCubes from "./components/GetAllCubes";
import GetCubeById from "./components/GetCubeById";
import DeleteCubeById from "./components/DeleteCubeById";
import UpdateCube from "./components/UpdateCube";
import React from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom"
import {Home} from "./components/Home";
import AppMenu from "./components/AppMenu";
import GetAllReviews from "./components/Reviews/GetAllReviews";
import ReviewAdd from "./components/Reviews/ReviewAdd";
import ReviewDetails from "./components/Reviews/ReviewDetails";
import ReviewEdit from "./components/Reviews/ReviewEdit";
import ReviewDelete from "./components/Reviews/ReviewDelete";
import GetAllProducers from "./components/Producers/GetAllProducers";
import ProducerAdd from "./components/Producers/ProducerAdd";
import ProducerDetails from "./components/Producers/ProducerDetails";
import ProducerEdit from "./components/Producers/ProducerEdit";
import ProducerDelete from "./components/Producers/ProducerDelete";
import GetAllCubesProducers from "./components/CubesProducers/GetAllCubesProducers";
import CPAdd from "./components/CubesProducers/CPAdd";
import CPDelete from "./components/CubesProducers/CPDelete";
import CPDetails from "./components/CubesProducers/CPDetails";
import CPEdit from "./components/CubesProducers/CPEdit";
import PrivateRoute from "./components/Security/RedirectLogin";
import LoginPage from "./components/Security/LoginPage"

function App() {
    return (
        <React.Fragment>
            <Router>
                <AppMenu/>
                <Routes>
                    <Route path="/" element={<PrivateRoute> <Home/> </PrivateRoute>}/>
                    <Route path="/cubes" element={<PrivateRoute> <GetAllCubes/> </PrivateRoute>}/>
                    <Route path="/reviews" element={<PrivateRoute> <GetAllReviews/> </PrivateRoute>}/>
                    <Route path="/producers" element={<PrivateRoute><GetAllProducers/></PrivateRoute>}/>
                    <Route path="/cp" element={<PrivateRoute><GetAllCubesProducers/></PrivateRoute>}/>
                    <Route path="/cubes/:cubeId/details" element={<PrivateRoute><GetCubeById/></PrivateRoute>}/>
                    <Route path="/cubes/:cubeId/edit" element={<PrivateRoute><UpdateCube/></PrivateRoute>}/>
                    <Route path="/cubes/:cubeId/delete" element={<PrivateRoute><DeleteCubeById/></PrivateRoute>}/>
                    <Route path="/cubes/add" element={<PrivateRoute><AddCube/></PrivateRoute>}/>
                    <Route path="/cubes/stats"
                           element={<PrivateRoute><GetCubesAlphWithPriceBigger200/></PrivateRoute>}/>
                    <Route path="/reviews/add" element={<PrivateRoute><ReviewAdd/></PrivateRoute>}/>
                    <Route path="/reviews/:reviewId/details" element={<PrivateRoute><ReviewDetails/></PrivateRoute>}/>
                    <Route path="/reviews/:reviewId/edit" element={<PrivateRoute><ReviewEdit/></PrivateRoute>}/>
                    <Route path="/reviews/:reviewId/delete" element={<PrivateRoute><ReviewDelete/></PrivateRoute>}/>
                    <Route path="/producers/add" element={<PrivateRoute><ProducerAdd/></PrivateRoute>}/>
                    <Route path="/producers/:producerId/details"
                           element={<PrivateRoute><ProducerDetails/></PrivateRoute>}/>
                    <Route path="/producers/:producerId/edit" element={<PrivateRoute><ProducerEdit/></PrivateRoute>}/>
                    <Route path="/producers/:producerId/delete"
                           element={<PrivateRoute><ProducerDelete/></PrivateRoute>}/>
                    <Route path="/cp/add" element={<PrivateRoute><CPAdd/></PrivateRoute>}/>
                    <Route path="/cp/:cpId/details" element={<PrivateRoute><CPDetails/></PrivateRoute>}/>
                    <Route path="/cp/:cpId/edit" element={<PrivateRoute><CPEdit/></PrivateRoute>}/>
                    <Route path="/cp/:cpId/delete" element={<PrivateRoute><CPDelete/></PrivateRoute>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    {/*<Route path="/" element={<Home/>}/>*/}
                    {/*<Route path="/cubes" element={<GetAllCubes/>}/>*/}
                    {/*<Route path="/reviews" element={<GetAllReviews/>}/>*/}
                    {/*<Route path="/producers" element={<GetAllProducers/>}/>*/}
                    {/*<Route path="/cp" element={<GetAllCubesProducers/>}/>*/}
                    {/*<Route path="/cubes/:cubeId/details" element={<GetCubeById/>}/>*/}
                    {/*<Route path="/cubes/:cubeId/edit" element={<UpdateCube/>}/>*/}
                    {/*<Route path="/cubes/:cubeId/delete" element={<DeleteCubeById/>}/>*/}
                    {/*<Route path="/cubes/add" element={<AddCube/>}/>*/}
                    {/*<Route path="/cubes/stats" element={<GetCubesAlphWithPriceBigger200/>}/>*/}
                    {/*<Route path="/reviews/add" element={<ReviewAdd/>}/>*/}
                    {/*<Route path="/reviews/:reviewId/details" element={<ReviewDetails/>}/>*/}
                    {/*<Route path="/reviews/:reviewId/edit" element={<ReviewEdit/>}/>*/}
                    {/*<Route path="/reviews/:reviewId/delete" element={<ReviewDelete/>}/>*/}
                    {/*<Route path="/producers/add" element={<ProducerAdd/>}/>*/}
                    {/*<Route path="/producers/:producerId/details" element={<ProducerDetails/>}/>*/}
                    {/*<Route path="/producers/:producerId/edit" element={<ProducerEdit/>}/>*/}
                    {/*<Route path="/producers/:producerId/delete" element={<ProducerDelete/>}/>*/}
                    {/*<Route path="/cp/add" element={<CPAdd/>}/>*/}
                    {/*<Route path="/cp/:cpId/details" element={<CPDetails/>}/>*/}
                    {/*<Route path="/cp/:cpId/edit" element={<CPEdit/>}/>*/}
                    {/*<Route path="/cp/:cpId/delete" element={<CPDelete/>}/>*/}
                </Routes>
            </Router>
        </React.Fragment>
    );
}

export default App;
