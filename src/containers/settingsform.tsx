import * as React from "react";
import { Tab } from "semantic-ui-react";
import { connect, Dispatch } from "react-redux";
import { reduxForm, InjectedFormProps } from "redux-form";

import { IReducer } from "../reducers/index";
import { ISettings } from "../reducers/settings";
import GeneralSettings from "../components/settings/general";
import SecuritySettings from "../components/settings/security";


export interface ISettingsFormProps {
}

export interface ISettingsFormStateProps {
  initialValues: ISettings;
}

type PropsType = ISettingsFormProps & ISettingsFormStateProps;

type InjectedPropsType = InjectedFormProps<PropsType>;

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


const reduxFormWrapped = reduxForm({
  form: "settings",
})(SettingsForm);

export default connect(mapStateToProps, () => ({}))(reduxFormWrapped);
