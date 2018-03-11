import * as React from "react";
import { Field, reduxForm, WrappedFieldProps } from "redux-form";
import Header from "semantic-ui-react/dist/es/elements/Header";
import Dropdown from "semantic-ui-react/dist/es/modules/Dropdown";

import DefaultLanguageInput from "./DefaultLanguageInput";
import LanguageDropdownInput from "./LanguageDropdownInput";


const LanguageSettings = (props: {}) => (
  <React.Fragment>
    <Header dividing={true}>
      Highlight Languages
    </Header>
    <Field
      name="languages"
      component={LanguageDropdownInput}
      style={{ marginBottom: "1em" }}
    />

    <Field
      name="defaultlanguage"
      component={DefaultLanguageInput as any}
    />
  </React.Fragment>
);

export default LanguageSettings;
