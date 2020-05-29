import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {deleteTweet, editFavorties} from '../actions/tweetActions';
import Favorite from '../media/favorite.png';
import Favorited from '../media/favorited.png';
import Delete from '../media/delete.png';

function Tweet(props) {

    const [isFavorited, setFavorite] = useState(false);

    const {_id, username, body, date, favorites} = props.tweet
    const profileUsername = props.profile.username,
            profileFavorites = props.profile.favorites ? props.profile.favorites : [];

    let newDate = new Date(date),
        month = '' + (newDate.getMonth() + 1),
        day = '' + newDate.getDate(),
        year = newDate.getFullYear();

    newDate = [month, day, year].join('/')

    const verifyDelete = id => {
        if (window.confirm("Are you sure you want to delete this tweet?")) props.deleteTweet(id)
    }

    const handleFavorite = (e, id) => {
        props.editFavorties(id, isFavorited ? -1 : 1)
    }

    useEffect(() => {
        setFavorite(profileFavorites.includes(_id));
    })

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
                <p id="tweet-favorites">
                    <img onClick={(event) => handleFavorite(event, _id)} src={isFavorited ? Favorited : Favorite} />
                    {favorites}
                </p>
                <img style={{visibility: profileUsername === username & profileUsername !== null ? "visible" : "hidden"}} onClick={() => verifyDelete(_id)} src={Delete} />
            </div>
        </div>
    )
}

// src={profileFavorites.includes(_id) ? Favorited : Favorite}

const mapStateToProps = state => {
    return {
        profile: state.accounts.profile
    }
}

export default connect(mapStateToProps, {deleteTweet, editFavorties})(Tweet)