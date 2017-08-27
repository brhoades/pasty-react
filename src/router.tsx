import * as React from "react";
import { HashRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";

import AboutPasty from "./components/aboutpasty";
import Layout from "./components/layout";
import CreatePaste from "./containers/createpaste";
import SettingsForm from "./containers/settingsform";
import ViewPaste from "./containers/viewpaste";


const Router = ({ history }) => (
  <ConnectedRouter history={history}>
    <Layout>
      <Route
        path="/about"
        component={AboutPasty}
      />
      <Route exact path="/" component={CreatePaste}/>
      <Route
        path="/view/:id/:key/:extra?"
        component={ViewPaste}
      />
      <Route
        path="/settings"
        component={SettingsForm}
      />
    </Layout>
  </ConnectedRouter>
);

export default Router;

