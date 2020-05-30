import axios from 'axios';
import {getAllTweets} from './tweetActions';
import {getProfile, trackFavorites} from './accountActions';
import { readSync } from 'fs';

export const getReplies = (tweetId) => dispatch => {
    axios.get(`/api/replies/${tweetId}`)
    .then(res => {
        if(res.data === null) console.log("NULL")
        dispatch({
            type: "GET_REPLIES",
            payload: res.data
        })
    })
}

export const createReply = (tweetId, body) => dispatch => { 
    const token = localStorage.getItem('token');
    axios({
        method: "POST",
        url: "/api/replies",
        data: {tweetId, body},
        headers: {"x-auth-token": token}
    })
    .then(res => {
        dispatch(getAllTweets())
        dispatch({
            type: "CREATE_REPLY",
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err)
    })
}

export const deleteReply = (replyId, body) => dispatch => { 
    const token = localStorage.getItem('token');
    axios({
        method: "DELETE",
        url: "/api/replies",
        data: {replyId, body},
        headers: {"x-auth-token": token}
    })
    .then(res => {
        dispatch(getAllTweets())
        //dispatch(getReplies())
        dispatch({
            type: "DELETE_REPLY",
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err)
    })
}

export const editFavorites = (replyId, add, tweetId) => dispatch => {
    const token = localStorage.getItem('token');
    dispatch(trackFavorites(replyId, add));
    axios({
        method: "PUT",
        url: "/api/replies/favorite",
        data: {replyId, add},
        headers: {"x-auth-token": token}
    })
    .then(res => {
        // dispatch(getReplies(tweetId));
        dispatch(getProfile());
        dispatch({
            type: "EDIT_REPLY",
            payload: {
                add,
                replyId
            }
        })
    })
    .catch(err => {
        console.log(err)
    })
}