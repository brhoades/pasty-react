import * as React from "react";
import { Field, InjectedFormProps, reduxForm, WrappedFieldProps } from "redux-form";
import { Dropdown, Header } from "semantic-ui-react";


export interface ILanguageSettingsProps {
}

// TODO: InjectFormProps doesn't cut it
const LanguageDropdown = (props) => (
  <Dropdown
    fluid={true}
    multiple={true}
    search={true}
    selection={true}
    options={
      hljs.listLanguages().map(lang => ({
        key: lang,
        text: lang,
        value: lang,
      }))
    }
    value={props.input.value}
    onChange={(ev, data) => props.input.onChange(data.value)}
  />
);

const LanguageSettings = (props: ILanguageSettingsProps) => (
  <div>
    <Header dividing={true}>
      Highlight Language Options
    </Header>
    <Field
      name="languages"
      component={LanguageDropdown}
    />
  </div>
);

export default LanguageSettings;
