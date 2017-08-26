import * as React from "react";
import { Fields, FieldsProps, FieldArrayMetaProps } from "redux-form";

import { IPartialPasteFile, PasteFileTypes } from "../reducers/form";
import AddTextFileField from "./addtextfilefield";
import PasteFileForm from "./pastefileform";


// Can't get types to work here.
const PasteFileForms = (props: any) => (
  <div>
    {props.meta.error}
    {
      props.fields.map((fieldName, index) => (
        <Fields
          key={fieldName}
          component={PasteFileForm}
          names={[`${fieldName}.type`, `${fieldName}.name`, `${fieldName}.data`, `${fieldName}.meta`]}
          props={{
            index,
            name: fieldName,
          }}
        />
      ))
    }
  </div>
);


export default PasteFileForms;
