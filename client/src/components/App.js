import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutAccount} from '../actions/accountActions';

import Home from './Home';
import Register from './Register';
import AccountList from './AccountList';
import Profile from './Profile';
import Login from './Login';

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
            <Route path="/register" component={Register} />
            <Route path="/accounts" component={AccountList} />
            <Redirect to="/" />
        </Switch>
    )
}

// Change to function?
class App extends React.Component {

    render() {
        return(
            <Router>
                {this.props.isAuthenticated ? <button onClick={this.props.logoutAccount}>LOGOUT</button> : <Link to="/">HOME</Link>}
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