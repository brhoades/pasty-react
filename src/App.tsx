import { History } from "history";
import createHistory from "history/createHashHistory";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Store } from "redux";

import { readSettings } from "actions/creators";
import SettingsLoader from "helpers/loaders/settings";
import Router from "pages/router";
import { IReducer } from "reducers/index";
import irc from "./hljs/irc";
import createStore from "./store";


const App = () => {
  const history: History = createHistory();
  const store: Store<IReducer> = createStore(history);

  // FIXME: Put this somewhere else?
  hljs.registerLanguage("irc", irc);


  return (
    <Provider store={store}>
      <div>
        <SettingsLoader />
        <Router history={history} />
      </div>
    </Provider>
  );
};

render(App(), document.getElementById("app"));
