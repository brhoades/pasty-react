import { applyMiddleware, createStore as createReduxStore, Store } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer, { IReducer } from "./reducers/index";
import saga from "./sagas";


// render the application
const store = (): Store<IReducer> => {
  const sagaMiddleware = createSagaMiddleware();
  const reduxStore: Store<IReducer> = createReduxStore(
    reducer,
    applyMiddleware(sagaMiddleware),
  );

  sagaMiddleware.run(saga);

  return reduxStore;
};

export default store;
