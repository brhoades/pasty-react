import { routerReducer as router } from "react-router-redux";
import { combineReducers, Reducer } from "redux";
import { reducer as reduxFormReducer } from "redux-form";

import createPaste, { ICreatePasteReducer } from "pages/paste/reducer";
import viewPaste, { IViewPasteReducer } from "pages/view/reducer";
import { IPasteReduxFormReducer } from "./form";
import highlight, { IHighlightReducer } from "./highlight";
import messages, { IMessagesReducer } from "./messages";
import settings, { ISettings } from "./settings";


export interface IReducer {
  createPaste: ICreatePasteReducer;
  form: IPasteReduxFormReducer;
  highlight: IHighlightReducer;
  messages: IMessagesReducer;
  viewPaste: IViewPasteReducer;
  settings: ISettings;
  routing: Reducer<any>;
}


const pasty = combineReducers<IReducer>({
  createPaste,
  form: reduxFormReducer,
  highlight,
  messages,
  router,
  settings,
  viewPaste,
});


export default pasty;
