import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {SagaIterator} from "redux-saga";
import {
  GET_PASTE_FROM_URL,
} from './actions/types';


function* saga(): SagaIterator {
  yield takeEvery(GET_PASTE_FROM_URL, (action) => action);
}

export default saga;
