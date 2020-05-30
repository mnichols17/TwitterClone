const defaultState = {
    tweets: []
}

export default function (state = defaultState, action) {
    switch(action.type){
        case("GET_TWEETS"):
            return {
                tweets: action.payload
            }
        default:
            return state;
    }
}