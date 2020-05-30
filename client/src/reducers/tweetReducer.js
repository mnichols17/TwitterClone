const defaultState = {
    tweets: []
}

export default function (state = defaultState, action) {
    switch(action.type){
        case("GET_TWEETS"):
            return {
                tweets: action.payload
            }
        case("CREATE_TWEET"):
            return {
                tweets: [action.payload.tweet, ...state.tweets]
            }
        case("DELETE_TWEET"):
            state.tweets = state.tweets.filter(tweet => tweet._id !== action.payload.tweetId)
            return {
                tweets: state.tweets
            }
        case("EDIT_TWEET"):
            const tweetIndex = state.tweets.findIndex(tweet => tweet._id === action.payload.tweetId)
            state.tweets[tweetIndex].favorites += action.payload.add;
            return {
                tweets: state.tweets
            }
        default:
            return state;
    }
}