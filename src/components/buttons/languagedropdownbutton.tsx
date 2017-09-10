import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { change } from "redux-form";
import Dropdown from "semantic-ui-react/dist/es/modules/Dropdown";

import { IReducer } from "../../reducers/index";


interface ILanguageDropdownButtonDispatchProps {
  change: (lang: string | number | React.ReactText[]) => void;
}

interface ILanguageDropdownButtonPropsState {
  highlight: string;
  languages: string[];
}

interface ILanguageDropdownButtonProps {
  index: number;
}

type PropsType = ILanguageDropdownButtonDispatchProps & ILanguageDropdownButtonPropsState & ILanguageDropdownButtonProps;

// Remotely connects to the active form and sets the highlight language.
// Hacky... but looks nice.
const LanguageDropdownButton = (props: PropsType) => (
  <Dropdown
    button={true}
    search={true}
    onChange={(ev, data) => props.change(data.value)}
    defaultValue={props.highlight}
    options={[
      {
        key: "auto",
        text: "Auto Detect",
        value: "auto",
      },
      {
        key: "plain",
        text: "Plain",
        value: "plain",
      },
      ...props.languages.map((lang) => ({
        key: lang,
        text: lang,
        value: lang,
      }))
    ]}
  />
);

const mapStateToProps = (state: IReducer, ownProps: ILanguageDropdownButtonProps): ILanguageDropdownButtonPropsState => {
  const thisFile = state.form.createpaste.values.files[ownProps.index];

  return {
    highlight: thisFile.meta.highlight,
    languages: state.settings.languages,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IReducer>, ownProps: ILanguageDropdownButtonProps): ILanguageDropdownButtonDispatchProps => ({
  change: (lang) => dispatch(change('createpaste', `files[${ownProps.index}].meta.highlight`, lang)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageDropdownButton);
