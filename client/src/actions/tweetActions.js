import axios from 'axios';
import {getProfile , trackFavorites} from './accountActions';

export const getAllTweets = () => dispatch => { 
    axios({
        method: "GET",
        url: "/api/tweets"
    })
    .then(res => { 
        dispatch({
            type: "GET_TWEETS",
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err)
    })
}

export const createTweet = (body) => dispatch => { 
    const token = localStorage.getItem('token');
    axios({
        method: "POST",
        url: "/api/tweets",
        data: {body},
        headers: {"x-auth-token": token}
    })
    .then(res => {
        dispatch({
            type: "CREATE_TWEET",
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err)
    })
}

export const editFavorties = (tweetId, add) => dispatch => {
    const token = localStorage.getItem('token');
    dispatch(trackFavorites(tweetId, add));
    axios({
        method: "PUT",
        url: "/api/tweets/favorite",
        data: {tweetId, add},
        headers: {"x-auth-token": token}
    })
    .then(res => {
        dispatch(getProfile());
        //dispatch(getAllTweets())
        dispatch({
            type: "EDIT_TWEET",
            payload: {
                add,
                tweetId
            }
        })
    })
    .catch(err => {
        console.log(err)
    })
}

export const deleteTweet = (id) => dispatch => {
    const token = localStorage.getItem('token');
    axios({
        method: "DELETE",
        url: "/api/tweets",
        data: {tweetId: id},
        headers: {"x-auth-token": token}
    })
    .then(res => {
        //dispatch(getAllTweets());
        dispatch({
            type: "DELETE_TWEET",
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err)
    })
}