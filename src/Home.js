import {Link} from "react-router-dom";
import React from "react";


function Home() {
    return (

        <div>

            <h2>Home</h2>
            <Link to="/register">Register</Link><br/>
            <Link to="/app">Products</Link><br/>




        </div>
    );
}
export default Home;