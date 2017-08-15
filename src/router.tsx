import * as React from "react";
import { HashRouter, Route } from "react-router-dom";
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import CreatePaste from "./containers/createpaste";
import ViewPaste from "./containers/viewpaste";


const Router = ({ history }) => (
  <ConnectedRouter history={history}>
    <div>
      <Route exact path="/" component={CreatePaste}/>
      <Route
        path="/view/:id/:key/:extra?"
        component={ViewPaste}
      />
    </div>
  </ConnectedRouter>
);

export default Router;

