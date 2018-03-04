import * as React from "react";
import { Field, WrappedFieldProps } from "redux-form";
import Radio from "semantic-ui-react/dist/es/addons/Radio";

import ButtonIconOrText from "components/ButtonIconOrText";


class UseFontIconsToggle extends React.PureComponent<WrappedFieldProps & {}> {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  public render() {
    return (
      <Radio
        toggle={true}
        onChange={this.onChange}
        checked={this.props.input.value}
        label="Use font icons"
      />
    );
  }

  private onChange(ev, data) {
    return this.props.input.onChange(data.checked);
  }
}

const FontIconsSettings = () => (
  <div>
    <Field
      name="fonticons"
      component={UseFontIconsToggle}
    />

    <ButtonIconOrText
      icon="download"
      text="Download this file"
      style={{ marginLeft: "5em" }}
    />
  </div>
);

export default FontIconsSettings;
