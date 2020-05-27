import axios from 'axios';

export const getAllTweets = () => dispatch => {  // Change this to get other profiles (not the user)
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
        
    })
}