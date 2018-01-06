
import Maybe from "../monads/maybe";
import { IPartialPasteFile } from "../reducers/form";
import { IReducer } from "../reducers/index";
import { IHasIndex } from "./fileprops";


// Many components just grab a file from the form. These help those
// get their properties.
export interface IFileFormProps<T> {
  file: IPartialPasteFile;
}

// Default props type for something without any other props.
export interface IFileFormByIndexPropsType {
  index: number;
  file: IPartialPasteFile;
}

export function getFileFormByIndex<T>(state: IReducer, props: IHasIndex<T>): IFileFormProps<T> {
  return {
    file: state.form.createpaste.values.files[props.index],
  };
}

export const getFileFormByIndexDefault = (state, props) => (
  getFileFormByIndex<IFileFormByIndexPropsType>(state, props)
);
