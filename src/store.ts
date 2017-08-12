import { applyMiddleware, createStore as createReduxStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import reducer, { IReducer } from "./reducers/index";
import saga from "./sagas";


// render the application
const store = (): Store<IReducer> => {
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = composeWithDevTools({});
  const reduxStore: Store<IReducer> = createReduxStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  sagaMiddleware.run(saga);

  return reduxStore;
};

export default store;
