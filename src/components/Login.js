import React, { Component } from 'react';
import queryString from 'query-string';
// const queryString = require('query-string');

// import history from './history'

import '../css/login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: queryString.parse(this.props.location.search).msg
    }
  }

  login(e) {
    e.preventDefault();
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({ login: this.user.value, senha: this.senha.value }),
      headers: new Headers({
        'Content-type': 'application/json'
      })
    };

    fetch('http://localhost:8080/api/public/login', requestInfo)
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('não foi possível fazer o login');
        }
      })
      .then(token => {
        localStorage.setItem('auth-token', token);
        this.props.history.push('/timeline');
      })
      .catch(error => this.setState({ msg: error.message }));
  }

  // render

  render() {
    return (
      <div className="login-box">
        <h1 className="header-logo">Instalura</h1>
        <span>{this.state.msg}</span>
        <form onSubmit={this.login.bind(this)}>
          <input type="text" ref={(input) => this.user = input} />
          <input type="password" ref={(input) => this.senha = input} />
          <input type="submit" value="login" />
        </form>
      </div>
    );
  }
}

export default Login;
