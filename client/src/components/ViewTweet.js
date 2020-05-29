import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {getAllTweets, deleteTweet, editFavorties} from '../actions/tweetActions';
import {getReplies} from '../actions/replyActions';
import Tweet from './Tweet';
import Reply from './Reply';

class ViewTweet extends React.Component {

    componentDidMount = () => {
        this.props.getAllTweets();
        this.props.getReplies(this.props.match.params.id);
    }
    componentWillUnmount = () => {
        this.props.getReplies();
    }

    render() {
        return(
            <div>
                {this.props.tweets.map(tweet => 
                    this.props.match.params.id === tweet._id ? <Tweet key={tweet._id} tweet={tweet} viewTweet={true} /> : null
                )}
                {this.props.replies.map(reply => {
                    return (
                        <div key={reply._id} id="replyLine">
                            <div className="replyTick"><h1 style={{visibility: "hidden"}}>Reply</h1></div>
                            <Reply reply={reply} />
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tweets: state.tweets.tweets,
        replies: state.replies.replies 
    }
}

export default connect(mapStateToProps, {getReplies, getAllTweets})(ViewTweet)