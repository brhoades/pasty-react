import * as React from "react";
import { WrappedFieldProps } from "redux-form";
import { Dropdown } from "semantic-ui-react";


export interface ILanguageDropdownProps {
}

const LanguageDropdownInput = (props: WrappedFieldProps & ILanguageDropdownProps) => (
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

export default LanguageDropdownInput;
