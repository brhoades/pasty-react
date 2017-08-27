import * as React from "react";
import { Tab } from "semantic-ui-react";

import GeneralSettings from "../components/settings/general";
import SecuritySettings from "../components/settings/security";


export interface ISettingsForm {
}

const tabs = [
  {
    menuItem: 'General',
    render: () => (
      <Tab.Pane attached="bottom">
        <GeneralSettings />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Security',
    render: () => (
      <Tab.Pane attached="bottom">
        <SecuritySettings />
      </Tab.Pane>
    ),
  },
];

const SettingsForm = (props: ISettingsForm) => (
  <Tab menu={{ attached: "top", pointing: true, secondary: true }} panes={tabs} />
);

export default SettingsForm;
