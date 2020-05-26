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

export const getAccount = () => dispatch => {
    // Get token from local storage instead at some point
    const token = localStorage.getItem('token');
    axios({
        method: "GET",
        url: "/api/accounts",
        headers: {"x-auth-token": token}
    })
    .then(res => {
        dispatch({
            type: "GET_ACCOUNT",
            payload: res.data
        })
    })
    .catch(err => {
        // TOKEN INVALID
        console.log(err.response.data.Error)
    })
}
 
export const loginAccount = (user, password) => dispatch => {
    axios.post('/api/auth', {user, password})
    .then(res => {
        console.log(res.data.token)
        localStorage.setItem('token', res.data.token);
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data
        })
    })
    .catch(err => {
        // IF PASSWORD INCORRECT or ACCOUNT DOESN'T EXIST
        console.log(err.response.data.Error)
    })
}

export const logoutAccount = (user, password) => dispatch => {
    localStorage.removeItem('token');
    dispatch({
        type: "LOGOUT_SUCCESS"
    })
}

export const registerAccount = (username, password, email, name) => dispatch => {
    axios.post('/api/accounts', {username, password, email, name})
    .then(res => {
        localStorage.setItem('token', res.data.token); // Right now returns token and data, might be good for future (not having to call GET ACCOUNT everytime) but for now token is what I want
        dispatch({
            type: "REGISTER_ACCOUNT",
            payload: res.data
        })
    })
    .catch(err => {
        // ACCOUNT ALREADY EXISTS
        console.log(err.response.data.Error)
    })
}