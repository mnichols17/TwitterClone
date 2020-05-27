import React, {useState} from 'react';
import {useLocation, Link} from 'react-router-dom';
import {connect} from 'react-redux';

function Navbar(props) {

    const location = useLocation().pathname //probably won't need this
    
    return(
        <div id="navbar">  
            <Link to="/profile">{props.profile.username}</Link> 
            <button>TWEET</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        profile: state.accounts.profile
    }
}

export default connect(mapStateToProps)(Navbar)