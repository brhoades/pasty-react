import * as React from "react";
import { Field, WrappedFieldProps } from "redux-form";
import Form from "semantic-ui-react/dist/es/collections/Form";
import Label from "semantic-ui-react/dist/es/elements/Label";


export default class KeySizeInput extends React.PureComponent<WrappedFieldProps> {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  public render() {
    const error = (
      <Label basic={true} color="red" pointing="above">{this.props.meta.error}</Label>
    );

    const description = (
      <React.Fragment>
        Larger is better; used for <a href="https://en.wikipedia.org/wiki/PBKDF2">PBKDF2</a>.
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <Form.Input
          value={this.props.input.value}
          type="number"
          onChange={this.onChange}
          error={this.props.meta.invalid}
        />
        {this.props.meta.invalid ? error : description}
      </React.Fragment>
    );
  }

  private onChange(event, data) {
    return this.props.input.onChange(data.value);
  }
}
