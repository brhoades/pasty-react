import { routerReducer as router } from "react-router-redux";
import { combineReducers, Reducer } from "redux";
import { reducer as reduxFormReducer } from "redux-form";

import { IPasteReduxFormReducer } from "./form";
import highlight, { IHighlightReducer } from "./highlight";
import paste, { IPasteReducer } from "./paste";
import settings, { ISettings } from "./settings";


export interface IReducer {
  form: IPasteReduxFormReducer;
  highlight: IHighlightReducer;
  paste: IPasteReducer;
  settings: ISettings;
  routing: Reducer<any>;
}


const pasty = combineReducers<IReducer>({
  form: reduxFormReducer,
  highlight,
  paste,
  router,
  settings,
});


export default pasty;
