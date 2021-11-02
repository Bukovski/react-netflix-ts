import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { IsUserRedirect, ProtectedRoute } from './helpers/routes.helper';
import { Home, Browse, SignIn, SignUp } from "./pages";
import { RouteConstants } from "./types/routes.type";
import { useAuthListener } from "./hooks";


const App = () => {
  const { user } = useAuthListener();


  return (
    <Router>
      <Switch>
        <IsUserRedirect
          user={ user }
          loggedInPath={ RouteConstants.BROWSE }
          path={ RouteConstants.SIGN_IN }
        >
          <SignIn />
        </IsUserRedirect>

        <IsUserRedirect
          user={ user }
          loggedInPath={ RouteConstants.BROWSE }
          path={ RouteConstants.SIGN_UP }
        >
          <SignUp />
        </IsUserRedirect>

        <ProtectedRoute
          user={ user }
          path={ RouteConstants.BROWSE }
        >
          <Browse />
        </ProtectedRoute>

        <IsUserRedirect
          user={ user }
          loggedInPath={ RouteConstants.BROWSE }
          path={ RouteConstants.HOME }
        >
          <Home />
        </IsUserRedirect>
      </Switch>
    </Router>
  );
}


export default App;