import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {getAllTweets} from '../actions/tweetActions';
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
        const foundTweet = this.props.tweets.findIndex((tweet) => this.props.match.params.id === tweet._id)
        return(
            foundTweet !== -1 ? 
            <div>
                <Tweet key={foundTweet} tweet={this.props.tweets[foundTweet]} viewTweet={true} />
                {this.props.replies.map(reply => {
                    return (
                        <div key={reply._id} id="replyLine">
                            <div className="replyTick"><h1 style={{visibility: "hidden"}}>Reply</h1></div>
                            <Reply reply={reply}/>
                        </div>
                    )
                })}
            </div> : <Redirect to="/" />
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