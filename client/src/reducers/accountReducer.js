const defaultState = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    profile: {},
    error: undefined
}

export default function (state = defaultState, action) {
    switch(action.type){
        case("GET_PROFILE"):
        case("EDIT_ACCOUNT_INFO"):
            return {
                ...state,
                profile: action.payload
            }
        case("REGISTER_ACCOUNT"):
        case("LOGIN_SUCCESS"):
            return {
                isAuthenticated: true,
                profile: action.payload
            }
        case("LOGOUT"):
        case("DELETE_ACCOUNT"):
            return {
                profile: {},
                isAuthenticated: false
            }
        case("LOGIN_FAIL"):
        case("ERROR"):
            return {
                profile: {},
                isAuthenticated: false,
                error: action.payload
            }
        default:
            return state;
    }
}