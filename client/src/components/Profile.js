import React from 'react';
import {connect} from 'react-redux';
import {getProfile} from '../actions/accountActions';

class Profile extends React.Component {

    componentDidMount = () => {
        this.props.getProfile(this.props.token)
    }

    render() {
        console.log(this.props)
        const {profile} = this.props
        return(
            <div>
                <h1>{profile.username}</h1>
                <h1>{profile.email}</h1>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.accounts.token,
        profile: state.accounts.profile 
    }
}

export default connect(mapStateToProps, {getProfile})(Profile)

