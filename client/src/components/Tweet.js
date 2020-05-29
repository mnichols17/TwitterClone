import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {deleteTweet, editFavorties} from '../actions/tweetActions';
import Favorite from '../media/favorite.png';
import Delete from '../media/delete.png';

function Tweet(props) {

    const {_id, username, body, date, favorites} = props.tweet

    let newDate = new Date(date),
        month = '' + (newDate.getMonth() + 1),
        day = '' + newDate.getDate(),
        year = newDate.getFullYear();

    newDate = [month, day, year].join('/')

    const verifyDelete = id => {
        if (window.confirm("Are you sure you want to delete this tweet?")) props.deleteTweet(id)
    }

    const handleFavorite = id => {
        props.editFavorties(id, 1)
    }

    return(
        <div key={_id} id="tweet">
            <div className="tweet-user">
                <h3><Link to={`/profile/${username}`}>@{username}</Link></h3>
            </div>
            <div className="tweet-body">
                <p>{body}</p>
            </div>
            <div className="tweet-date-delete">
                <p>{newDate}</p>
                <p id="tweet-favorites"><img onClick={() => handleFavorite(_id)} src={Favorite} />{favorites}</p>
                { props.username === username & props.username !== null ? <img onClick={() => verifyDelete(_id)} src={Delete} /> : null }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        username: state.accounts.profile.username
    }
}

export default connect(mapStateToProps, {deleteTweet, editFavorties})(Tweet)