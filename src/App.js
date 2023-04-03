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

function App() {
    return (
        // <div className="App">
        //     <ul>
        //         <li><AddCube/>
        //             <GetAllCubes/>
        //             <UpdateCube/></li>
        //         <li>
        //             <GetCubesAlphWithPriceBigger200/>
        //             <GetCubeById/>
        //             <DeleteCubeById/>
        //             </li>
        //     </ul>
        // </div>
        <React.Fragment>
            <Router>
                <AppMenu/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/cubes" element={<GetAllCubes/>}/>
                    <Route path="/cubes/:cubeId/details" element={<GetCubeById/>}/>
                    <Route path="/cubes/:cubeId/edit" element={<UpdateCube/>}/>
                    <Route path="/cubes/:cubeId/delete" element={<DeleteCubeById/>}/>
                    <Route path="/cubes/add" element={<AddCube/>}/>
                    <Route path="/cubes/stats" element={<GetCubesAlphWithPriceBigger200/>}/>
                </Routes>
            </Router>
        </React.Fragment>
    );
}

export default App;
