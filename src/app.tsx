import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { FaqsContainer, FooterContainer, JumbotronContainer } from "./containers";
import { RouteConstants } from "./types/routes.type";


const App = () => {
  return (
    <Router>
      <Switch>

        <Route exact path={ RouteConstants.HOME }>
          <JumbotronContainer/>

          <FaqsContainer />
          <FooterContainer />
        </Route>

      </Switch>
    </Router>
  );
}


export default App;