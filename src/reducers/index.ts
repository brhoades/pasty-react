import { connectRouter } from "connected-react-router";
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


export default (history) => combineReducers<IReducer>({
  createPaste,
  form: reduxFormReducer,
  highlight,
  messages,
  router: connectRouter(history),
  settings,
  viewPaste,
});
