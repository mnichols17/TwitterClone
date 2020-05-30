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
        case("EDIT_REPLY"):
            console.log(state.replies)
            const replyIndex = state.replies.findIndex(reply => reply._id === action.payload.replyId)
            state.replies[replyIndex].favorites += action.payload.add;
            console.log(state.replies)
            return {
                replies: state.replies
            }
        default:
            return state;
    }
}