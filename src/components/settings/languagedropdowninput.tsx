import * as React from "react";
import { WrappedFieldProps } from "redux-form";
import Dropdown from "semantic-ui-react/dist/es/modules/Dropdown";


interface ILanguageDropdownInput {
  style: any;
}

export default class LanguageDropdownInput extends React.PureComponent<WrappedFieldProps & ILanguageDropdownInput> {
  private options: Array<{ key: string, text: string, value: string }>;

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.options = hljs.listLanguages().map(lang => ({
      key: lang,
      text: lang,
      value: lang,
    }));
  }

  public render() {
    return (
      <div>
        <label>
          Available Choices
        </label>
        <Dropdown
          fluid={true}
          multiple={true}
          search={true}
          selection={true}
          options={this.options}
          value={this.props.input.value}
          onChange={this.onChange}
          style={this.props.style}
        />
      </div>
    );
  }

  private onChange(event, data) {
    return this.props.input.onChange(data.value);
  }
}
