const defaultState = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    profile: {}
}

export default function (state = defaultState, action) {
    switch(action.type){
        case("GET_ACCOUNT"):
            return {
                ...state
            }
        case("GET_PROFILE"):
        case("EDIT_ACCOUNT"):
            return {
                ...state,
                profile: action.payload
            }
        case("REGISTER_ACCOUNT"):
        case("LOGIN_SUCCESS"):
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
        case("LOGIN_FAIL"):
        case("ERROR"):
            console.log(action.payload);
            return {
                ...state,
                isAuthenticated: false
            }
        default:
            return state;
    }
}