import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from './components/history';

import './css/reset.css';

import App from './App';
import Login from './components/Login';
import TimeLine from './components/TimeLine';
import registerServiceWorker from './registerServiceWorker';

const routers = (
  <App>
    <Switch>
      <Route exact path='/' component={Login} history={history} />
      <Route exact path='/timeline' component={TimeLine} />
    </Switch>
  </App>
);

ReactDOM.render(
  (
    <Router>
      {routers}
    </Router>
  ),
  document.getElementById('root')
);
registerServiceWorker();
