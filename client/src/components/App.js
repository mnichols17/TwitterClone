import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getProfile} from '../actions/accountActions';

import '../styles/styles.css';
import Home from './Home';
import Register from './Register';
import Profile from './Profile';
import Navbar from './Navbar';
import Timeline from './Timeline';

const authRoutes = ({getProfile, profile}) => {
    if(!profile.username) getProfile();
    return (
        <Switch>
            <Route path="/" exact component={Timeline} />
            <Route path="/profile/:username" component={Profile} />
            <Redirect to="/" />
        </Switch>
    )
}

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={Register} />\
            <Redirect to="/" />
        </Switch>
    )
}

// Change to function?
class App extends React.Component {

    render() {
        return(
            <Router>
                {this.props.isAuthenticated === true ? <Navbar /> : null}
                {this.props.isAuthenticated ? authRoutes(this.props) : Routes()}
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.accounts.isAuthenticated,
        profile: state.accounts.profile
    }
}

export default connect(mapStateToProps, {getProfile})(App);