import React from 'react';
import {connect} from 'react-redux';
import {getAllTweets} from '../actions/tweetActions';

import Tweet from './Tweet';

class Timeline extends React.Component {

    componentDidMount = () => {
        this.props.getAllTweets();
    }

    render() {
        return(
            <div>
                {this.props.tweets.map(tweet => {
                    return <Tweet key={tweet._id} tweet={tweet} />
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        tweets: state.tweets.tweets 
    }
}

export default connect(mapStateToProps, {getAllTweets})(Timeline)