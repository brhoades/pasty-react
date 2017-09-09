import * as React from "react";
import { Field, reduxForm, WrappedFieldProps } from "redux-form";
import { Dropdown, Header } from "semantic-ui-react";

import LanguageDropdownInput from "./languagedropdowninput";


export interface ILanguageSettingsProps {
}

const LanguageSettings = (props: ILanguageSettingsProps) => (
  <div>
    <Header dividing={true}>
      Highlight Language Options
    </Header>
    <Field
      name="languages"
      component={LanguageDropdownInput}
    />
  </div>
);

export default LanguageSettings;
