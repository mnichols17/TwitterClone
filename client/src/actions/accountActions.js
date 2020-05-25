import axios from 'axios';

export const getAccounts = () => dispatch => {
    axios.get('/api/accounts/all')
    .then(res => {
        dispatch({
            type: "GET_ALL_ACCOUNTS",
            payload: res.data
        })
    })
}

export const getProfile = (token) => dispatch => {
    // Get token from local storage instead at some point
    axios({
        method: "GET",
        url: "/api/accounts",
        headers: {"x-auth-token": token}
    })
    .then(res => {
        console.log(res)
        dispatch({
            type: "GET_PROFILE",
            payload: res.data
        })
    })
}
 
export const loginAccount = (user, password) => dispatch => {
    axios.post('/api/auth', {user, password})
    .then(res => {
        console.log(res.data);
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data
        })
    })
    .catch(err => {
        // CATCH ERROR
        console.log(err.response.data.Error)
    })
}

export const registerAccount = (username, password, email, name) => dispatch => {
    axios.post('/api/accounts', {username, password, email, name})
    .then(res => {
        console.log(res.data)
        dispatch({
            type: "REGISTER_ACCOUNT",
            payload: res.data
        })
    })
    .catch(err => {
        // CATCH ERROR
        console.log(err.response.data.Error)
    })
}