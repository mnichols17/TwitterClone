const defaultState = {
    replies: []
}

export default function (state = defaultState, action) {
    switch(action.type){
        case("GET_REPLIES"):
            return {
                replies: action.payload
            }
        case("CREATE_REPLY"):
            state.replies.push(action.payload)
            return {
                replies: state.replies
            }
        case("DELETE_REPLY"):
            state.replies = state.replies.filter(reply => reply._id !== action.payload.replyId)
            return {
                replies: state.replies
            }
        default:
            return state;
    }
}