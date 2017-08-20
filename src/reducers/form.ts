import { MetaData } from "pasty-core";


export enum PasteFileTypes {
  FILE,
  CODE,
}

export interface IPartialPasteFile {
  id: number;
  type: PasteFileTypes;
  name: string;
  data: string;

  meta: MetaData;
}

export interface IPasteFormData {
  files: IPartialPasteFile[];
}

export interface IReduxFormReducerData<T> {
  values?: T;
  initial?: T;
}

export interface IPasteReduxFormReducer {
  createpaste: IReduxFormReducerData<IPasteFormData>;
}
