import { History } from "history";
import createHistory from "history/createHashHistory";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Store } from "redux";

import { readSettings } from "./actions/creators";
import CreatePaste from "./containers/createpaste";
import ViewPaste from "./containers/viewpaste";
import SettingsLoader from "./loaders/settings";
import { IReducer } from "./reducers/index";
import Router from "./router";
import createStore from "./store";


const App = () => {
  const history: History = createHistory();
  const store: Store<IReducer> = createStore(history);

  return (
    <Provider store={store}>
      <div>
        <SettingsLoader />
        <Router history={history} />
      </div>
    </Provider>
  );
};

ReactDOM.render(App(), document.getElementById("app"));
