import * as React from "react";
import { Fields } from "redux-form";

import AddTextFileField from "../components/addtextfilefield";
import PasteFileForm from "../components/pastefileform";
import { IPartialPasteFile, PasteFileTypes } from "../reducers/form";


// Can't get types to work here.
const PasteFileForms = (props: any) => {
  const field = props.fields.map((fieldName, index) => (
    <Fields
      key={fieldName}
      component={PasteFileForm}
      names={[`${fieldName}.type`, `${fieldName}.name`, `${fieldName}.data`, `${fieldName}.meta`]}
      props={{ index, name: fieldName }}
    />
  ));

  return (
    <div>
      {props.meta.error}
      {field}
    </div>
  );
};


export default PasteFileForms;
