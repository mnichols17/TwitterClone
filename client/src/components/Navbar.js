import React, {useState} from 'react';
import {useLocation, Link} from 'react-router-dom';
import {connect} from 'react-redux';

function Navbar(props) {

    const location = useLocation().pathname
    
    return(
        <button onClick={props.logoutAccount}>LOGOUT</button> 
    )
}

export default connect(null)(Navbar)