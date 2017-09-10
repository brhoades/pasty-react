import { combineReducers } from 'redux'
import paste, { PasteReducer } from './paste'

export interface Reducer {
  paste: PasteReducer
};


const pasty = combineReducers<Reducer>({
  paste,
});


export default pasty;
