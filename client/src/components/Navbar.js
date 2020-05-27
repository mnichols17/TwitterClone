import React, {useState} from 'react';
import {useLocation, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import SendTweet from './SendTweet';

function Navbar(props) {

    const [isTweeting, setTweeting] = useState(false)
    const location = useLocation().pathname //probably won't need this
    return(
        <div>
            <div id="navbar">  
                <Link to="/profile">@{props.profile.username}</Link> 
                <button onClick={() => setTweeting(!isTweeting)}>TWEET</button>
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