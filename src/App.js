import React, { Component } from 'react';

import './css/timeline.css';

// import TimeLine from './components/TimeLine';
class App extends Component {
  render() {
    console.log('====================================');
    console.log(this.props.children);
    console.log('====================================');
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
