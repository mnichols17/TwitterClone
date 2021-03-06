import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutAccount, deleteAccount} from '../actions/accountActions';
import {getAllTweets} from '../actions/tweetActions';

import EditAccount from './EditAccount';
import Tweet from './Tweet';

class Profile extends React.Component {

    // use a hook?
    state = {
        edit: false,
        profile: {}
    }

    componentDidMount = () => {
        this.props.getAllTweets();
        if (this.props.profile.username !== this.props.match.params.username) {
            axios.get(`/api/accounts/${this.props.match.params.username}`)
            .then(res => {
                this.setState({profile: res.data})
            })
        } else {
            this.setState({profile: this.props.profile})
        }
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.profile !== this.props.profile || prevProps.match.params.username !== this.props.match.params.username){
            this.setState({
                edit: false,
                profile: this.props.profile,
            })
            this.props.getAllTweets();
        }
    }

    deleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account?")) this.props.deleteAccount()
        // CHECK Redux state to see if it's cleared
    }

    render() {
        const profile = this.state.profile;
        return(
            profile ? <div>
                <div style={{display: this.props.profile.username !== profile.username ? "none" : null}} id="profileButtons">
                        <button onClick={() => this.setState({edit: !this.state.edit})}>Edit Account</button>
                        <button onClick={this.props.logoutAccount}>Logout</button>
                        <button id="deleteAccount" onClick={this.deleteAccount}>Delete Account</button>
                </div>
                <div id="profile">
                    <h1>@{profile.username}</h1>
                    <h2>{profile.name}</h2>
                    <div style={{display: this.props.profile.username !== profile.username ? "none" : null}} id="profileButtons-mobile">
                        <button onClick={() => this.setState({edit: !this.state.edit})}>Edit Account</button>
                        <button onClick={this.props.logoutAccount}>Logout</button>
                    </div> 
                    { this.state.edit ? <EditAccount history={this.props.history} /> : <button id="deleteAccount-mobile" style={{display: this.props.profile.username !== profile.username ? "none" : null}} onClick={this.deleteAccount}>DELETE ACCOUNT</button> }
                </div>
                <div id="profileTweets">
                    <h3>@{profile.username}'s Tweets:</h3>
                    {this.props.tweets.map(tweet => {
                        return profile.username === tweet.username ? <Tweet key={tweet._id} tweet={tweet} /> : null
                    })}
                </div>
            </div> : <Redirect to="/" />
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

