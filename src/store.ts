import { History } from "history";
import {
  ConnectedRouter,
  routerMiddleware as createRouterMiddleware,
} from "react-router-redux";
import { applyMiddleware, createStore as createReduxStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import highlightMiddleware from "./middleware/highlight";
import redirectToNewPasteMiddleware from "./middleware/redirectToNewPaste";
import themeMiddleware from "./middleware/theme";
import reducer, { IReducer } from "./reducers/index";
import saga from "./sagas";


// render the application
const store = (history: History): Store<IReducer> => {
  const sagaMiddleware = createSagaMiddleware();
  const routerMiddleware = createRouterMiddleware(history);

  const composeEnhancers = composeWithDevTools({});
  const reduxStore: Store<IReducer> = createReduxStore(
    reducer,
    composeEnhancers(applyMiddleware(
      themeMiddleware,
      sagaMiddleware,
      redirectToNewPasteMiddleware,
      routerMiddleware,
      highlightMiddleware,
    )),
  );

  sagaMiddleware.run(saga);

  return reduxStore;
};

export default store;
