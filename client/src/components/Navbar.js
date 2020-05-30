import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import SendTweet from './SendTweet';
import Logo from '../media/logo.png';

function Navbar(props) {

    const [isTweeting, setTweeting] = useState(false)
    return(
        <div>
            <div id="navbar">  
                <Link id="profile-link" to={`/profile/${props.profile.username}`}>@{props.profile.username}</Link> 
                <Link to="/"><img alt="logo" src={Logo} /></Link>
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