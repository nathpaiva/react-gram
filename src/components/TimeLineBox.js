import React, { Component } from 'react';

import './css/timeline.css';

import Header from './components/Header';
import TimeLine from './components/TimeLine';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <TimeLine />
      </div>
    );
  }
}

export default App;
