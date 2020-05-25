const defaultState = {
    isAuthenticated: localStorage.getItem('token') ? true : false, // true or false based on token existing
    accounts: [], // Remove this at some point
    token: null,
    profile: {}
}

export default function (state = defaultState, action) {
    switch(action.type){
        case("GET_ALL_ACCOUNTS"):
            return {
                ...state,
                accounts: action.payload
            }
        case("GET_PROFILE"):
            return {
                ...state,
                profile: action.payload
            }
        case("REGISTER_ACCOUNT"):
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true
            }
        case("LOGIN_SUCCESS"):
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true
            }
        default:
            return state;
    }
}