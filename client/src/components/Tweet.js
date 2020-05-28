import React, {useState} from 'react';
import {connect} from 'react-redux';

function Tweet(props) {

    const {_id, username, body, date} = props.tweet

    let newDate = new Date(date),
        month = '' + (newDate.getMonth() + 1),
        day = '' + newDate.getDate(),
        year = newDate.getFullYear();

    newDate = [month, day, year].join('/')


    return(
        <div key={_id} id="tweet">
            <div className="tweet-user">
                <h3>@{username}</h3>
            </div>
            <div className="tweet-body">
                <p>{body}</p>
            </div>
            <div className="tweet-date">
                <p>{newDate}</p>
            </div>
        </div>
    )
}

export default connect(null)(Tweet)