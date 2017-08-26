import * as React from "react";
import { WrappedFieldProps } from "redux-form";

import { IPartialPasteFile, PasteFileTypes, IPartialPasteFileForm } from "../reducers/form";
import AddTextFileField from "./addtextfilefield";


interface IPasteFileFormProps {
  index: number;
  name: string;
  files: Array<IPartialPasteFileForm | undefined>;
}


/*
 * Delegates to the correct form for the type.
 */
const PasteFileForm = (props: IPasteFileFormProps) => {
  const fields = props.files[props.index];

  return (
    (fields.type.input.value === PasteFileTypes.CODE
      ? (<AddTextFileField key={props.name} fields={fields} index={props.index} name={props.name} />)
      : (<input key={props.name} type="text" {...props} />)
    )
  );
};


export default PasteFileForm;
