import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
} from 'react-router-dom';

import DefaultLayout from '../pages/_layouts/default';

interface RouteProps extends ReactDOMRouteProps {
  /* isPrivate?: boolean; */
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  const Layout = DefaultLayout;

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return (
          <Layout>
            <Component />
          </Layout>
        );
      }}
    />
  );
};

export default Route;
