import React, {useState} from 'react';
import {connect} from 'react-redux';

function Tweet(props) {

    const {_id, username, body, date} = props.tweet

    return(
        <div key={_id} id="tweet">
            <div className="tweet-user">
                <h3>@{username}</h3>
            </div>
            <div className="tweet-body">
                <p>{body}</p>
            </div>
            <div className="tweet-date">
                <p>{date}</p>
            </div>
        </div>
    )
}

export default connect(null)(Tweet)