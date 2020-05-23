import axios from 'axios';

export const getAccounts = () => dispatch => {
    axios.get('/api/accounts')
    .then(res => {
        dispatch({
            type: "GET_ALL_ACCOUNTS",
            payload: res.data
        })
    })
}

export const createAccounts = (username, password, email, name) => dispatch => {
    // axios.get('/api/accounts')
    // .then(res => {
    //     dispatch({
    //         type: "GET_ALL_ACCOUNTS",
    //         payload: res.data
    //     })
    // })
    console.log(username, password, email, name)
}