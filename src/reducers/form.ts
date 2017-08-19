import { MetaData } from "pasty-core";


export enum PasteFileTypes {
  FILE,
  CODE,
}

export interface IPartialPasteFile {
  type: PasteFileTypes;
  filename: string;
  content: string;

  meta: MetaData;
}

export interface IPasteFormData {
  files: IPartialPasteFile[];
}

export interface IReduxFormReducerData<T> {
  values?: T;
  initialValues?: T;
}

export interface IPasteReduxFormReducer {
  createpaste: IReduxFormReducerData<IPasteFormData>;
}
