import React, {useState} from 'react';
import {connect} from 'react-redux';
import {logoutAccount, deleteAccount} from '../actions/accountActions';
import {getAllTweets} from '../actions/tweetActions';

import EditAccount from './EditAccount';
import Tweet from './Tweet';

class Profile extends React.Component {

    state = {
        edit: false
    }

    componentDidMount = () => {
        this.props.getAllTweets();
    }

    deleteAccount = () => {
        console.log("delete")
        // this.props.deleteAccount
    }

    render() {
        const {profile} = this.props
        console.log(this.props.tweets)
        return(
            <div>
                <div id="profile">
                    <h1>@{profile.username}</h1>
                    <h2>{profile.name}</h2>
                    <div id="profileButtons">
                        <button onClick={() => this.setState({edit: !this.state.edit})}>Edit Account</button>
                        <button onClick={this.props.logoutAccount}>Logout</button>
                    </div> 
                    {this.state.edit ? <EditAccount /> : <button id="deleteAccount" onClick={this.deleteAccount}>DELETE ACCOUNT</button>}
                </div>
                <div id="profileTweets">
                    <h3>@{profile.username}'s Tweets:</h3>
                    {this.props.tweets.map(tweet => {
                        return profile.username === tweet.username ? <Tweet key={tweet._id} tweet={tweet} /> : null
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        profile: state.accounts.profile,
        tweets: state.tweets.tweets 
    }
}

export default connect(mapStateToProps, {logoutAccount, deleteAccount, getAllTweets})(Profile)

