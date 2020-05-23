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

export const createAccount = (username, password, email, name) => dispatch => {
    axios.post('/api/accounts', {username, password, email, name})
    .then(res => {
        dispatch({
            type: "CREATE_ACCOUNT",
            payload: res.data
        })
    })
}