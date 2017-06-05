import React, { Component } from 'react';

import './css/timeline.css';

// import TimeLine from './components/TimeLine';
class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
