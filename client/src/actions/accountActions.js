import axios from 'axios';

export const getProfile = () => dispatch => {
    const token = localStorage.getItem('token');
    axios({
        method: "GET",
        url: "/api/accounts",
        headers: {"x-auth-token": token}
    })
    .then(res => {
        dispatch({
            type: "GET_PROFILE",
            payload: res.data
        })
    })
    .catch(err => {
        localStorage.removeItem('token');
        dispatch({
            type: "ERROR",
            payload: err
        })
    })
}

export const registerAccount = (username, password, email, name) => dispatch => {
    axios.post('/api/accounts', {username, password, email, name})
    .then(res => {
        localStorage.setItem('token', res.data.token); 
        dispatch({
            type: "REGISTER_ACCOUNT",
            payload: res.data.profile
        })
    })
    .catch(err => {
        dispatch({
            type: "ERROR",
            payload: err.response.data.Error
        })
    })
}

export const editAccount = (username) => dispatch => {
    const token = localStorage.getItem('token');
    axios({
        method: "PUT",
        url: "/api/accounts",
        headers: {"x-auth-token": token},
        data: {username} // Right now can only change username
    })
    .then(res => { 
        dispatch(getProfile());
    })
    .catch(err => {
        dispatch({
            type: "EDIT_ACCOUNT_ERROR",
            payload: err.response.data.Error
        })
    })
}

export const deleteAccount = () => dispatch => {
    const token = localStorage.getItem('token');
    axios({
        method: "DELETE",
        url: "/api/accounts",
        headers: {"x-auth-token": token}
    })
    .then(res => {
        localStorage.removeItem('token');
        dispatch({
            type: "DELETE_ACCOUNT"
        })
    })
    .catch(err => {
        dispatch({
            type: "ERROR",
            payload: err.response.data.Error
        })
    })
}
 
export const loginAccount = (user, password) => dispatch => {
    axios.post('/api/auth', {user, password})
    .then(res => {
        localStorage.setItem('token', res.data.token);
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data.profile
        })
    })
    .catch(err => {
        dispatch({
            type: "ERROR",
            payload: err.response.data.Error
        })
    })
}

export const logoutAccount = () => dispatch => {
    localStorage.removeItem('token');
    dispatch({
        type: "LOGOUT"
    })
}

export const trackFavorites = (tweetId, add) => dispatch => {
    const token = localStorage.getItem('token');
    axios({
        method: "PUT",
        url: "/api/accounts/favorite",
        headers: {"x-auth-token": token},
        data: {tweetId, add}
    })
    .then(res => {
        dispatch(getProfile());
    })
}