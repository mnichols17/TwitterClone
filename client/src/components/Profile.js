import React, {useState} from 'react';
import {connect} from 'react-redux';
import {logoutAccount, deleteAccount} from '../actions/accountActions';

import EditAccount from './EditAccount';

class Profile extends React.Component {

    //const [editAccount, toggleEdit] = useState(false);
    state = {
        edit: false
    }

    deleteAccount = () => {
        console.log("delete")
        // this.props.deleteAccount
    }

    render() {
        const {profile} = this.props
        return(
            <div id="profile">
                <h1>@{profile.username}</h1>
                <h2>{profile.name}</h2>
                <div>
                    <button onClick={() => this.setState({edit: !this.state.edit})}>Edit Account</button>
                    <button onClick={this.props.logoutAccount}>Logout</button>
                </div> 
                {this.state.edit ? <EditAccount /> : <button id="deleteAccount" onClick={this.deleteAccount}>DELETE ACCOUNT</button>}
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

