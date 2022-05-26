import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Home from '../pages/Home';

// import ProductsSearch from '../pages/products/ProductsSearch';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/marvel-flix-frontend/" exact component={Home} />
    <Route path="/marvel-flix-frontend/:channel" exact component={Home} />
  </Switch>
);

export default Routes;
