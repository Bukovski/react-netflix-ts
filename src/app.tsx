import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home } from "./pages";
import { RouteConstants } from "./types/routes.type";


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={ RouteConstants.HOME }>
          <Home />
        </Route>

      </Switch>
    </Router>
  );
}


export default App;