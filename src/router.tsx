import * as React from "react";
import { HashRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";

import CreatePaste from "./containers/createpaste";
import ViewPaste from "./containers/viewpaste";
import Layout from "./components/layout"


const Router = ({ history }) => (
  <ConnectedRouter history={history}>
    <Layout>
      <Route exact path="/" component={CreatePaste}/>
      <Route
        path="/view/:id/:key/:extra?"
        component={ViewPaste}
      />
    </Layout>
  </ConnectedRouter>
);

export default Router;

