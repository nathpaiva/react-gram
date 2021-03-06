import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from './components/history';

import './css/reset.css';

import App from './App';
import Authenticated from './components/Authenticated'

import Login from './components/Login';
import Logout from './components/Logout';
import ContainerApp from './components/ContainerApp';
// import TimeLine from './components/TimeLine';
import registerServiceWorker from './registerServiceWorker';


const routers = (
  <App>
    <Switch>
      <Route exact path='/' component={Login} history={history} />
      <Route exact path='/logout' component={Logout} history={history} />
      <Authenticated exact path='/timeline' component={ContainerApp} history={history} />
      <Route exact path="/timeline/:login" component={ContainerApp} history={history} />
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
