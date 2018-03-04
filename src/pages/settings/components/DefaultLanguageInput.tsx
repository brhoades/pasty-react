import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { WrappedFieldProps } from "redux-form";
import Dropdown from "semantic-ui-react/dist/es/modules/Dropdown";

import { getLanguages } from "helpers/selectors/languages";
import { IReducer } from "reducers/index";


interface IDefaultLanguageInputPropsState {
  languages: Array<{ key: string, text: string, value: string }>;
}

type PropsType = WrappedFieldProps & IDefaultLanguageInputPropsState;

class DefaultLanguageInput extends React.Component<PropsType> {
  private options: Array<{ key: string, text: string, value: string }>;

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  public render() {
    return (
      <div>
        <label>
          Default Choice
        </label>
        <Dropdown
          fluid={true}
          multiple={false}
          search={true}
          selection={true}
          options={this.props.languages}
          value={this.props.input.value}
          onChange={this.onChange}
        />
      </div>
    );
  }

  private onChange(event, data) {
    return this.props.input.onChange(data.value);
  }
}

const mapStateToProps = (state: IReducer, ownProps: {}): IDefaultLanguageInputPropsState => ({
  languages: getLanguages(state),
});

export default connect(mapStateToProps, {})(DefaultLanguageInput);
