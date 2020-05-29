import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {deleteTweet, editFavorties} from '../actions/tweetActions';
import Tweet from './Tweet';
import Reply from './Reply';

class ViewTweet extends React.Component {

    state = {
        replies: []
    }

    componentDidMount = () => {
        axios.get(`/api/replies/${this.props.match.params.id}`)
        .then(res => {
            if(res.data === null) console.log("NULL")
            this.setState({replies: res.data})
        })
    }

    render() {
        console.log(this.state.replies)
        return(
            <div>
                <Tweet tweet={this.props.location.state.tweet} />
                {this.state.replies.map(reply => {
                        return (
                            <div id="replyLine">
                                <div className="replyTick"><h1 style={{visibility: "hidden"}}>Reply</h1></div>
                                <Reply key={reply._id} reply={reply} />
                            </div>
                        )
                    })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tweets: state.tweets.tweets 
    }
}

export default connect(null, {})(ViewTweet)