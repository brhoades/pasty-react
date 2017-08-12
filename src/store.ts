import { applyMiddleware, createStore as createReduxStore, Store } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer, { Reducer } from "./reducers/index";
import saga from "./sagas";


// render the application
const store = (): Store<Reducer> => {
  const sagaMiddleware = createSagaMiddleware();
  const reduxStore: Store<Reducer> = createReduxStore(
    reducer,
    applyMiddleware(sagaMiddleware),
  );

  sagaMiddleware.run(saga);

  return reduxStore;
};

export default store;
