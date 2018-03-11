import * as React from "react";
import { HashRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";

import AboutPasty from "pages/about/AboutPasty";
import CopyAndEditPaste from "pages/copyandedit/CopyAndEditPaste";
import Layout from "pages/layout/Layout";
import CreatePaste from "pages/paste/CreatePaste";
import SettingsForm from "pages/settings/Settings";
import ViewPaste from "pages/view/ViewPaste";


const Router = ({ history }) => (
  <ConnectedRouter history={history}>
    <Layout>
      <Route
        path="/about"
        component={AboutPasty}
      />
      <Route exact={true} path="/" component={CreatePaste}/>
      <Route
        exact={true}
        path="/paste/:id/:key"
        component={CopyAndEditPaste}
      />
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

