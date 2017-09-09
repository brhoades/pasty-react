import * as React from "react";
import { Field, InjectedFormProps, reduxForm, WrappedFieldProps } from "redux-form";
import { connect, Dispatch } from "react-redux";

import { Dropdown, Header, Grid } from "semantic-ui-react";


export interface ILanguageSettingsProps {
}

export interface ILanguageSettingsDispatchProps {
}

export interface ILanguageSettingsStateProps {
  
}

type PropsType = ILanguageSettingsProps & ILanguageSettingsStateProps & ILanguageSettingsDispatchProps;

const LanguageDropdown = (props) => {
  console.dir(props.input.value);
  return (
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
}

const getAllLanguages = () => hljs.listLanguages();

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
