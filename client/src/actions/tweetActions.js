import axios from 'axios';

export const getAllTweets = () => dispatch => { 
    axios({
        method: "GET",
        url: "/api/tweets"
    })
    .then(res => { 
        dispatch({
            type: "GET_ALL_TWEETS",
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
        dispatch({
            type: "CREATE_TWEETS",
        })
    })
    .catch(err => {
        console.log(err)
    })
}