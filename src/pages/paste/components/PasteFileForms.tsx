import * as React from "react";
import { Fields } from "redux-form";

import { IPartialPasteFile, PasteFileTypes } from "reducers/form";
import AddTextFileField from "./AddTextFileField";
import PasteFileForm from "./PasteFileForm";


// Can't get types to work here.
const PasteFileForms = (props: any) => {
  const field = props.fields.map((fieldName, index) => (
    <Fields
      key={fieldName}
      component={PasteFileForm as any}  // complains about missing index
      names={[`${fieldName}.type`, `${fieldName}.name`, `${fieldName}.data`, `${fieldName}.meta`]}
      index={index}
      name={fieldName}
    />
  ));

  return (
    <React.Fragment>
      {props.meta.error}
      {field}
    </React.Fragment>
  );
};


export default PasteFileForms;
