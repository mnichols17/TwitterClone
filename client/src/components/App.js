import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Home from './Home';
import Register from './Register';
import AccountList from './AccountList';

export default function App() {
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/accounts" component={AccountList} />
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}