import React, {useState} from 'react';
import {useLocation, Link} from 'react-router-dom';
import {connect} from 'react-redux';

function Navbar(props) {

    const location = useLocation().pathname
    
    return(
        props.isAuthenticated ? 
            <button onClick={props.logoutAccount}>LOGOUT</button> 
            : 
            <nav>
                <Link style={{visibility: location === "/" ? "hidden" : "visible" }} to="/">HOME</Link>
            </nav>
    )
}

export default connect(null)(Navbar)