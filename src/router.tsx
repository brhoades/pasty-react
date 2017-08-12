import * as React from "react";
import { HashRouter, Route } from "react-router-dom";

import CreatePaste from "./containers/createpaste";
import ViewPaste from "./containers/viewpaste";


const Router = () => (
  <HashRouter>
    <div>
      <Route exact path="/" component={CreatePaste}/>
      <Route exact path="/view/:id/:key" component={ViewPaste}/>
    </div>
  </HashRouter>
);

export default Router;

