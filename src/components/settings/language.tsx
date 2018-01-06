import * as React from "react";
import { Field, reduxForm, WrappedFieldProps } from "redux-form";
import Header from "semantic-ui-react/dist/es/elements/Header";
import Dropdown from "semantic-ui-react/dist/es/modules/Dropdown";

import LanguageDropdownInput from "./languagedropdowninput";


const LanguageSettings = (props: {}) => (
  <div>
    <Header dividing={true}>
      Highlight Language Options
    </Header>
    <Field
      name="languages"
      component={LanguageDropdownInput as any} // redux-form type madness
    />
  </div>
);

export default LanguageSettings;
