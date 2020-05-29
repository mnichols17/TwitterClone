import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import tweetReducer from './tweetReducer';
import replyReducer from './replyReducer';

export default combineReducers({
    accounts: accountReducer,
    tweets: tweetReducer,
    replies: replyReducer
})