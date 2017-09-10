import { createStore as createReduxStore, applyMiddleware, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer, { Reducer } from './reducers/index'
import saga from './sagas'


// render the application
const store = (): Store<Reducer> => {
  const sagaMiddleware = createSagaMiddleware();
  const store: Store<Reducer> = createReduxStore(
    reducer,
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(saga);

  return store;
}

export default store;
