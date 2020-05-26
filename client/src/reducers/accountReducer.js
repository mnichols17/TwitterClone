const defaultState = {
    isAuthenticated: localStorage.getItem('token') ? true : false, // true or false based on token existing
    accounts: [], // Remove this at some point
    profile: {} // Will be useful later
}

// GET ACCOUNT, EDIT ACCOUNT, DELETE ACCOUNT, <- NEED TOKEN FOR INFORMATION
// REGISTER ACCOUNT, LOGIN ACCOUNT, LOGOUT ACCOUNT <- HANDLE TOKEN
// LOGIN FAIL <- SEND ERROR

export default function (state = defaultState, action) {
    switch(action.type){
        case("GET_ALL_ACCOUNTS"): // Get rid of this eventually
            return {
                ...state,
                accounts: action.payload
            }
        case("GET_ACCOUNT"): // Return account information
        case("EDIT_ACCOUNT"):
            return {
                ...state,
                profile: action.payload
            }
        case("REGISTER_ACCOUNT"):
        case("LOGIN_SUCCESS"): // Return token
            return {
                ...state,
                isAuthenticated: true
            }
        case("LOGOUT_SUCCESS"):
        case("DELETE_ACCOUNT"):
            return {
                ...state,
                isAuthenticated: false
            }
        default:
            return state;
    }
}