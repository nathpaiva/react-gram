import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const Authenticated = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    return localStorage.getItem('auth-token') ?
      (<Component {...props} />) :
      (<Redirect to="/?msg=voce nao pode acessar, é preciso estar logado" />);
  }} />
);

export default Authenticated;
