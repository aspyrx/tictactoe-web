/*
 * app.jsx - Bootstraps the React app using React Router.
 */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import './app.less';
import Index from './pages/index.jsx';

export default () => {
    render((
        <Router history={browserHistory}>
            <Route path="/" component={Index} />
        </Router>
    ), document.getElementById('app'));
};

