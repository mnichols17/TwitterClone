import React from 'react';
import {connect} from 'react-redux';
import {getAccount, deleteAccount} from '../actions/accountActions';

import EditAccount from './EditAccount';

class Profile extends React.Component {

    componentDidMount = () => {
        this.props.getAccount()
    }

    render() {
        console.log(this.props)
        const {profile} = this.props
        return(
            <div>
                <h1>{profile.username}</h1>
                <h1>{profile.email}</h1>
                <button onClick={this.props.deleteAccount}>DELETE ACCOUNT</button>
                <EditAccount />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        profile: state.accounts.profile 
    }
}

export default connect(mapStateToProps, {getAccount, deleteAccount})(Profile)

