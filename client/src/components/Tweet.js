import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {deleteTweet, editFavorties} from '../actions/tweetActions';
import Favorite from '../media/favorite.png';
import Favorited from '../media/favorited.png';
import Delete from '../media/delete.png';
import ReplyIcon from '../media/reply.png';
import SendReply from './SendReply';

function Tweet(props) {

    const [isFavorited, setFavorite] = useState(false);
    const [isReplying, setReplying] = useState(false);

    const {_id, username, body, date, favorites, replies} = props.tweet
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
    }, [profileFavorites, _id])

    return(
        <div key={_id} id="tweet">
            <div className="tweet-user">
                <h3><Link to={`/profile/${username}`}>@{username}</Link></h3>
            </div>
            <div className="tweet-body">
                <p><Link to={props.viewTweet ? "#" : `/tweet/${_id}`}>{body}</Link></p>
            </div>
            <div className="tweet-information">
                <p>{newDate}</p>
                <p className="tweet-details">
                    <img alt="favorite" onClick={(event) => handleFavorite(event, _id)} src={isFavorited ? Favorited : Favorite} />
                    {favorites}
                </p>
                <p className="tweet-details">
                    <img alt="reply" id="reply" onClick={() => setReplying(!isReplying)} src={ReplyIcon} />
                    {replies}
                </p>
                <img alt="delete" style={{visibility: profileUsername === username & profileUsername !== null ? "visible" : "hidden"}} onClick={() => verifyDelete(_id)} src={Delete} />
            </div>
            {isReplying ? <SendReply tweetId={_id} setReplying={setReplying}/> : null}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        profile: state.accounts.profile
    }
}

export default connect(mapStateToProps, {deleteTweet, editFavorties})(Tweet)