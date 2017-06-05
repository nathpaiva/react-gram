import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Authenticated = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    {/*check if route is absolut or not*/ }
    const key = props.match.path.replace(/^.*[\\\/]:/, '').replace('?', '');
    const isTrue = props.match.params[key] === undefined;

    if (isTrue && !localStorage.getItem('auth-token')) {
      return (<Redirect to="/?msg=voce nao pode acessar, é preciso estar logado" />);
    } else {
      return (<Component {...props} />);
    }
    {/*return localStorage.getItem('auth-token') ?
      (<Component {...props} />) :
      (<Redirect to="/?msg=voce nao pode acessar, é preciso estar logado" />);*/}
  }} />
);

export default Authenticated;
