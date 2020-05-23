const defaultState = {
    accounts: []
}

export default function (state = defaultState, action) {
    switch(action.type){
        case("GET_ALL_ACCOUNTS"):
            return {
                accounts: action.payload
            }
        case("GET_ACCOUNT"):
            return {

            }
        case("CREATE_ACCOUNT"):
            return {
                accounts: action.payload
            }
        default:
            return state;
    }
}