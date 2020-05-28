import axios from 'axios';

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
        dispatch(getAllTweets())
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
        dispatch(getAllTweets());
    })
    .catch(err => {
        console.log(err)
    })
}

export const deleteAccountTweets = (token) => dispatch => {
    axios({
        method: "DELETE",
        url: "/api/tweets/all",
        headers: {"x-auth-token": token}
    })
    .then(res => {
        dispatch(getAllTweets());
    })
    .catch(err => {
        console.log(err)
    })
}