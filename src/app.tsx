import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { readSettings } from "./actions/creators";
import CreatePaste from "./containers/createpaste";
import ViewPaste from "./containers/viewpaste";
import SettingsLoader from "./loaders/settings";
import Router from "./router";
import createStore from "./store";


const App = () => (
  <Provider store={createStore()}>
    <div>
      <SettingsLoader />
      <Router />
    </div>
  </Provider>
);

ReactDOM.render(App(), document.getElementById("app"));
