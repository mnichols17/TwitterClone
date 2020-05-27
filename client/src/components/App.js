import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutAccount} from '../actions/accountActions';

import '../styles/styles.css';
import Home from './Home';
import Register from './Register';
import Profile from './Profile';
import Navbar from './Navbar';

const authRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Profile} />
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
                <Navbar logoutAccount={this.props.logoutAccount} isAuthenticated={this.props.isAuthenticated} />
                {this.props.isAuthenticated ? authRoutes() : Routes()}
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.accounts.isAuthenticated
    }
}

export default connect(mapStateToProps, {logoutAccount})(App);