import React, {useState} from 'react';
import {useLocation, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import SendTweet from './SendTweet';
import Logo from '../media/logo.png';

function Navbar(props) {

    const [isTweeting, setTweeting] = useState(false)
    const location = useLocation().pathname //probably won't need this
    return(
        <div>
            <div id="navbar">  
                <Link to="/profile">@{props.profile.username}</Link> 
                <Link to="/"><img src={Logo} /></Link>
                <button onClick={() => setTweeting(!isTweeting)}>{isTweeting ? "HIDE" : "TWEET"}</button>
            </div>
            {isTweeting ? <SendTweet setTweeting={setTweeting}/> : null}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        profile: state.accounts.profile
    }
}

export default connect(mapStateToProps)(Navbar)