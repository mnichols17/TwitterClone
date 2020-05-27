const defaultState = {
    tweets: []
}
// GET ALL TWEETS, GET PROFILE TWEETS, CREATE TWEETS, DELETE TWEETS

export default function (state = defaultState, action) {
    switch(action.type){
        case("GET_ALL_TWEETS"):
            console.log(action.payload)
            return {
                tweets: action.payload
            }
        default:
            return state;
    }
}