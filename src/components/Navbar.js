import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';
import { useEffect, useState } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App"

const Navbar = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" elemennt =  {<App/>}>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Navbar