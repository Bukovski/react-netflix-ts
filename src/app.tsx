import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home, Browse, SignIn, SignUp } from "./pages";
import { RouteConstants } from "./types/routes.type";


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={ RouteConstants.SIGN_UP }>
          <SignUp />
        </Route>

        <Route exact path={ RouteConstants.SIGN_IN }>
          <SignIn />
        </Route>

        <Route exact path={ RouteConstants.BROWSE }>
          <Browse />
        </Route>

        <Route exact path={ RouteConstants.HOME }>
          <Home />
        </Route>

      </Switch>
    </Router>
  );
}


export default App;