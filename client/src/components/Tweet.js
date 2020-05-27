import React, {useState} from 'react';
import {connect} from 'react-redux';

function Tweet(props) {

    return(
        <div id="tweet">
            <div className="tweet-user">
                <h3>@user</h3>
            </div>
            <div className="tweet-body">
                <p>That's the tweet</p>
            </div>
            <div className="tweet-date">
                <p>May 27th 2020</p>
            </div>
        </div>
    )
}

export default connect(null)(Tweet)