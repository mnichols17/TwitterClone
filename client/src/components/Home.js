import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import Login from './Login';

const Home = props => {
    
    return(
        <div id="home">
            <h1>Twitter Clone</h1>
            <Login />
            <Link to="/register">Sign Up</Link>
        </div>
    )
}

export default Home;
