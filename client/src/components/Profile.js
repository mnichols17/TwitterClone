import React from 'react';
import {connect} from 'react-redux';
import {logoutAccount, deleteAccount} from '../actions/accountActions';

import EditAccount from './EditAccount';

class Profile extends React.Component {

    render() {
        const {profile} = this.props
        return(
            <div>
                <h1>@{profile.username}</h1>
                <h1>Name: {profile.name}</h1>
                <button style={{background: "Red"}} onClick={this.props.deleteAccount}>DELETE ACCOUNT</button>
                <EditAccount />
                <button style={{color: "red"}} onClick={this.props.logoutAccount}>LOGOUT</button> 
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        profile: state.accounts.profile 
    }
}

export default connect(mapStateToProps, {logoutAccount, deleteAccount})(Profile)

