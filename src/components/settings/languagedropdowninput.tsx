import * as React from "react";
import { WrappedFieldProps } from "redux-form";
import Dropdown from "semantic-ui-react/dist/es/modules/Dropdown";


export default class LanguageDropdownInput extends React.PureComponent<WrappedFieldProps> {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }
  public render() {
    const options = hljs.listLanguages().map(lang => ({
      key: lang,
      text: lang,
      value: lang,
    }));

    return (
      <Dropdown
        fluid={true}
        multiple={true}
        search={true}
        selection={true}
        options={options}
        value={this.props.input.value}
        onChange={this.onChange}
      />
    );
  }

  private onChange(event, data) {
    return this.props.input.onChange(data.value);
  }
}
