import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Home from './Home';

export default function App() {
    return(
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}