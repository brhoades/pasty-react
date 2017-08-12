import { combineReducers } from "redux";
import paste, { IPasteReducer } from "./paste";
import settings, { ISettings } from "./settings";


export interface IReducer {
  paste: IPasteReducer;
  settings: ISettings;
}


const pasty = combineReducers<IReducer>({
  paste,
  settings,
});


export default pasty;
