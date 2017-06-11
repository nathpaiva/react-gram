import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { timeline } from '../reducers/timeline';
import { notification } from '../reducers/header';

import TimeLine from './TimeLine';
import Header from './Header';


const reducers = combineReducers({ timeline, notification });
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// impsort './css/timeline.css';


class ContainerApp extends Component {
  constructor(props) {
    super(props);
    const { login } = this.props.match.params;
    this.login = login;
  }

  render() {
    return (
      <div>
        {/*<Header store={store} />*/}
        {/*history={history}*/}
        <TimeLine store={store} login={this.login} />
      </div>
    );
  }
}

export default ContainerApp;
