import axios from 'axios';

export const getProfile = () => dispatch => {
    const token = localStorage.getItem('token');
    axios({
        method: "GET",
        url: "/api/accounts",
        headers: {"x-auth-token": token}
    })
    .then(res => {
        if(res.data === null){ // FOR ACCOUNTS THAT HAVE BEEN DELETED BUT STILL MAKE IT THROUGH. NEED TO FIX LATER
            console.log(res.data)
            //dispatch(logoutAccount());
        } else {
            console.log(res.data)
            dispatch({
                type: "GET_PROFILE",
                payload: res.data
            })
        }
    })
    .catch(err => {
        // TOKEN INVALID (ACCOUNTS DELETED TOKEN WILL STILL WORK WHILE VALID)
        localStorage.removeItem('token');
        dispatch({
            type: "ERROR",
            payload: err
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
        console.log(res)
        // dispatch({
        //     type: "EDIT_ACCOUNT"
        // })
    })
    .catch(err => {
        // TOKEN INVALID
        console.log(err.response.data.Error)
        dispatch({
            type: "ERROR",
            payload: err
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
        // TOKEN INVALID
        console.log(err.response.data.Error)
        dispatch({
            type: "ERROR",
            payload: err
        })
    })
}
 
export const loginAccount = (user, password) => dispatch => {
    axios.post('/api/auth', {user, password})
    .then(res => {
        localStorage.setItem('token', res.data.token);
        dispatch(getProfile())
        dispatch({
            type: "LOGIN_SUCCESS"
        })
    })
    .catch(err => {
        // IF PASSWORD INCORRECT or ACCOUNT DOESN'T EXIST
        console.log(err.response.data.Error)
        dispatch({
            type: "ERROR",
            payload: err
        })
    })
}

export const logoutAccount = () => dispatch => {
    localStorage.removeItem('token');
    dispatch({
        type: "LOGOUT_SUCCESS"
    })
}

export const registerAccount = (username, password, email, name) => dispatch => {
    axios.post('/api/accounts', {username, password, email, name})
    .then(res => {
        localStorage.setItem('token', res.data.token); // Right now returns token and data, might be good for future (not having to call GET ACCOUNT everytime) but for now token is what I want
        dispatch(getProfile())
        dispatch({
            type: "LOGIN_SUCCESS"
        })
    })
    .catch(err => {
        // ACCOUNT ALREADY EXISTS
        console.log(err.response.data.Error)
        dispatch({
            type: "ERROR",
            payload: err
        })
    })
}