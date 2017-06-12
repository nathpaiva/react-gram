import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { timeline } from '../reducers/timeline';
import { notification } from '../reducers/header';

// import PropTypes from 'prop-types';

import TimeLine from './TimeLine';
import Header from './Header';

const reducers = combineReducers({ timeline, notification });
const store = createStore(reducers, applyMiddleware(thunkMiddleware));


class ContainerApp extends Component {

  render() {
    return (
      <div>
        <Header store={store} />
        <TimeLine store={store} login={this.props.match.params.login} />
      </div>
    );
  }
}

export default ContainerApp;
