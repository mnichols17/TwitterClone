import axios from 'axios';

export const getReplies = (tweetId) => dispatch => {
    axios({
        method: "GET",
        url: `/api/replies/${tweetId}`
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
}