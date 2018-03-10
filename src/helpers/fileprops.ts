import { File, Paste } from "pasty-core";

import Maybe from "helpers/maybe";
import { IReducer } from "reducers/index";


// Many components just grab a file from the store. These help those
// get their properties.
export interface IHasIndex<T> {
  index: number;
}

export interface IMaybeFileProps<T> {
  file: Maybe<File>;
}

// Default props type for something without any other props.
export interface IFileByIndexPropsType {
  index: number;
  file: Maybe<File>;
}

// Returns file with the index provided if the paste is ready.
export function getFileByIndex<T>(state: IReducer, props: IHasIndex<T>): IMaybeFileProps<T> {
  const file: Maybe<File> = state.viewPaste.paste.caseOf({
    just: (p: Paste) => new Maybe<File>(p.files[props.index]),
    nothing: () => new Maybe<File>(null),
  });

  return {
    file,
  };
}

// Default getFileByIndex implementation for the default props type
export const getFileByIndexDefault = (state, props) => (
  getFileByIndex<IFileByIndexPropsType>(state, props)
);
