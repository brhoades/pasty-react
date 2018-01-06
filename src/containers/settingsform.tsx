import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { InjectedFormProps, reduxForm } from "redux-form";
import Tab from "semantic-ui-react/dist/es/modules/Tab";

import { setAndSaveSettings } from "../actions/creators";
import GeneralSettings from "../components/settings/general";
import SecuritySettings from "../components/settings/security";
import { IReducer } from "../reducers/index";
import { ISettings } from "../reducers/settings";


export interface ISettingsFormStateProps {
  initialValues: ISettings;
}

type InjectedPropsType = InjectedFormProps<{}>;

const onChange = (values: ISettings, dispatch: Dispatch<IReducer>, props: InjectedPropsType) => {
  return dispatch(setAndSaveSettings(values));
};

const tabs = [
  {
    menuItem: "General",
    render: () => (
      <Tab.Pane attached="bottom">
        <GeneralSettings />
      </Tab.Pane>
    ),
  },
  {
    menuItem: "Security",
    render: () => (
      <Tab.Pane attached="bottom">
        <SecuritySettings />
      </Tab.Pane>
    ),
  },
];

const SettingsForm = (props: InjectedPropsType) => (
  <Tab menu={{ attached: "top", pointing: true, secondary: true }} panes={tabs} />
);

// TODO: Can't get types working for this return. It's likely something weird.
const mapStateToProps = (state: IReducer, ownProps: InjectedFormProps): any => ({
  initialValues: state.settings,
});


const reduxFormWrapped = reduxForm<ISettings>({
  form: "settings",
  onChange,
  // TODO: Validate
})(SettingsForm);

export default connect(mapStateToProps, () => ({}))(reduxFormWrapped);
