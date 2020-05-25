import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import Login from './Login';

const Home = props => {
    
    return(
        <div>
            <Login />
            <Link to="/register">REGISTER</Link>
            <br />
            <br />
            <Link to="/accounts">ACCOUNTS</Link>
            <br />
            <br />
            <Link to="/login">LOGIN</Link>
        </div>
    )
}

export default Home;
