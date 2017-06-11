import React from 'react';
// import { Route, Redirect, withRouter } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';

const Authenticated = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (!localStorage.getItem('auth-token')) {
      return (<Redirect to="/?msg=voce nao pode acessar, é preciso estar logado" />);
    } else {
      return (<Component {...props} />);
    }
  }} />
);

export default Authenticated;
