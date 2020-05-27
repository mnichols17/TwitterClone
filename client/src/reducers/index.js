import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import tweetReducer from './tweetReducer';

export default combineReducers({
    accounts: accountReducer,
    tweets: tweetReducer
})