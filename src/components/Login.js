import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import '../css/login.css';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  // render

  render() {
    return (
      <div className="login-box">
        <h1 className="header-logo">Instalura</h1>
        {/*<span>{this.state.msg}</span>*/}
        <form>
          <input type="text" ref={(input) => this.login = input} />
          <input type="password" ref={(input) => this.senha = input} />
          <input type="submit" value="login" />
        </form>
      </div>
    );
  }
}

export default Login;
