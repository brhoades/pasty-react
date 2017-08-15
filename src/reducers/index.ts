import { routerReducer as router } from "react-router-redux";
import { combineReducers, Reducer } from "redux";

import highlight, { IHighlightReducer } from "./highlight";
import paste, { IPasteReducer } from "./paste";
import settings, { ISettings } from "./settings";


export interface IReducer {
  highlight: IHighlightReducer;
  paste: IPasteReducer;
  settings: ISettings;
  routing: Reducer<any>;
}


const pasty = combineReducers<IReducer>({
  highlight,
  paste,
  router,
  settings,
});


export default pasty;
