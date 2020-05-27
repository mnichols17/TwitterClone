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
                <h1>@{profile.username}</h1>
                <h1>Name: {profile.name}</h1>
                <button style={{background: "Red"}} onClick={this.props.deleteAccount}>DELETE ACCOUNT</button>
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

