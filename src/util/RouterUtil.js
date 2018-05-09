import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import checkAuth from './checkAuth';

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
};

const PropsRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={routeProps => renderMergedProps(component, routeProps, rest)}
  />
);

PropsRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

const PrivateRoute = ({
  component,
  redirectTo,
  isLoggedIn,
  ...rest
}) => (
  <Route
    {...rest}
    render={
      routeProps =>
        (isLoggedIn ?
        renderMergedProps(component, routeProps, ...rest)
        :
        (<Redirect to={{
          pathname: redirectTo,
          state: { from: routeProps.location },
          }}
        />))
      }
  />);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export {
  PropsRoute,
  PrivateRoute,
};
