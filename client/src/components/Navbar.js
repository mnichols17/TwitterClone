import React, {useState} from 'react';
import {useLocation, Link} from 'react-router-dom';
import {connect} from 'react-redux';

function Navbar(props) {

    const location = useLocation().pathname //probably won't need this
    
    return(
        <div id="navbar">  
            <button>PROFILE</button>
            <button onClick={props.logoutAccount}>LOGOUT</button>  
        </div>
    )
}

export default connect(null)(Navbar)