import {Route, Routes} from "react-router-dom";
import React from "react";
import Register from "./Register";
import {BrowserRouter as Router} from "react-router";
import App from "./App";
import Home from "./Home";


function MainApp() {
    return (

        <div>


            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/app" element={<App />} />
                    <Route path="/register" element={<Register />} />
                    {/*<Route path="/home" element={<Home />} />*/}

                </Routes>
            </Router>
        </div>
    );
}
export default MainApp;