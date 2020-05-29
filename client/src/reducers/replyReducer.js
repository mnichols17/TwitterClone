const defaultState = {
    replies: []
}

export default function (state = defaultState, action) {
    switch(action.type){
        case("GET_REPLIES"):
            return {
                replies: action.payload
            }
        default:
            return state;
    }
}