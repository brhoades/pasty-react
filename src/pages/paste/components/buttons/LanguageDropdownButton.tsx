import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { change } from "redux-form";
import Dropdown from "semantic-ui-react/dist/es/modules/Dropdown";

import { getLanguages } from "helpers/selectors/languages";
import { IReducer } from "reducers/index";


interface ILanguageDropdownButtonDispatchProps {
  change: (lang: string | number | React.ReactText[]) => void;
}

interface ILanguageDropdownButtonPropsState {
  highlight: string;
  languages: Array<{ key: string, text: string, value: string }>;
}

interface ILanguageDropdownButtonProps {
  index: number;
}

type PropsType = ILanguageDropdownButtonDispatchProps
               & ILanguageDropdownButtonPropsState
               & ILanguageDropdownButtonProps;

// Remotely connects to the active form and sets the highlight language.
// Hacky... but looks nice.
class LanguageDropdownButton extends React.PureComponent<PropsType> {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  public render() {
    return (
      <Dropdown
        button={true}
        search={true}
        onChange={this.onChange}
        defaultValue={this.props.highlight}
        options={this.props.languages}
      />
    );
  }

  private onChange(event, data) {
    return this.props.change(data.value);
  }
}

const mapStateToProps = (state: IReducer, ownProps: ILanguageDropdownButtonProps)
                      : ILanguageDropdownButtonPropsState => {
  const thisFile = state.form.createpaste.values.files[ownProps.index];

  return {
    highlight: thisFile.meta.highlight !== "auto" ? thisFile.meta.highlight : state.settings.defaultlanguage,
    languages: getLanguages(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IReducer>, ownProps: ILanguageDropdownButtonProps)
                         : ILanguageDropdownButtonDispatchProps => ({
  change: (lang) => dispatch(change("createpaste", `files[${ownProps.index}].meta.highlight`, lang)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageDropdownButton);
