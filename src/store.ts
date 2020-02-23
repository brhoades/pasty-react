import { History } from "history";
import { routerMiddleware as createRouterMiddleware } from "connected-react-router"
import { applyMiddleware, createStore as createReduxStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import highlightMiddleware from "./middleware/highlight";
import redirectToNewPasteMiddleware from "./middleware/redirectToNewPaste";
import themeMiddleware from "./middleware/theme";
import createReducer, { IReducer } from "./reducers/index";
import saga from "./sagas";


// render the application
const store = (history: History): Store<IReducer> => {
  const sagaMiddleware = createSagaMiddleware();
  const routerMiddleware = createRouterMiddleware(history);

  const composeEnhancers = composeWithDevTools({});
  const reduxStore: Store<IReducer> = createReduxStore(
    createReducer(history),
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
