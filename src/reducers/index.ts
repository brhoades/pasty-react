import { combineReducers } from "redux";

import highlight, { IHighlightReducer } from "./highlight";
import paste, { IPasteReducer } from "./paste";
import settings, { ISettings } from "./settings";


export interface IReducer {
  highlight: IHighlightReducer;
  paste: IPasteReducer;
  settings: ISettings;
}


const pasty = combineReducers<IReducer>({
  highlight,
  paste,
  settings,
});


export default pasty;
