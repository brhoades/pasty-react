import * as React from "react";
import { Field, reduxForm, WrappedFieldProps } from "redux-form";
import { connect, Dispatch } from "react-redux";
import { Dropdown, Header, Grid } from "semantic-ui-react";

import { loadTheme } from "../../actions/creators";
import { IReducer } from "../../reducers/index";
import ThemePreview from "./themepreview";


export interface IThemeSettings {
}

export interface IThemeSettingsDispatchProps {
  changeTheme: (theme: string) => void;
}

type PropsType = IThemeSettings & IThemeSettingsDispatchProps;

const themes = [
  "agate", "androidstudio", "arduino-light", "arta", "ascetic", "atelier-cave-dark", "atelier-cave-light", "atelier-dune-dark", "atelier-dune-light", "atelier-estuary-dark", "atelier-estuary-light", "atelier-forest-dark", "atelier-forest-light", "atelier-heath-dark", "atelier-heath-light", "atelier-lakeside-dark", "atelier-lakeside-light", "atelier-plateau-dark", "atelier-plateau-light", "atelier-savanna-dark", "atelier-savanna-light", "atelier-seaside-dark", "atelier-seaside-light", "atelier-sulphurpool-dark", "atelier-sulphurpool-light", "atom-one-dark", "atom-one-light", "brown-paper", "codepen-embed", "color-brewer", "darcula", "dark", "darkula", "default", "docco", "dracula", "far", "foundation", "github", "github-gist", "googlecode", "grayscale", "gruvbox-dark", "gruvbox-light", "hopscotch", "hybrid", "idea", "ir-black", "kimbie.dark", "kimbie.light", "magula", "mono-blue", "monokai", "monokai-sublime", "obsidian", "ocean", "paraiso-dark", "paraiso-light", "pojoaque", "purebasic", "qtcreator_dark", "qtcreator_light", "railscasts", "rainbow", "routeros", "school-book", "solarized-dark", "solarized-light", "sunburst", "tomorrow", "tomorrow-night-blue", "tomorrow-night-bright", "tomorrow-night", "tomorrow-night-eighties", "vs2015", "vs", "xcode", "xt256", "zenburn"
];

const ThemeDropdown = (props: WrappedFieldProps & IThemeSettingsDispatchProps) => (
  <Dropdown
    search={true}
    selection={true}
    options={
      themes.map(theme => ({
        text: theme,
        value: `${theme}.css`,
      }))
    }
    value={props.input.value}
    onChange={
      (ev, data) => {
        props.changeTheme(data.value as string);
        props.input.onChange(data.value);
    }}
  />
);


const mapDispatchToProps = (dispatch: Dispatch<IReducer>): IThemeSettingsDispatchProps => ({
  changeTheme: (theme: string) => dispatch(loadTheme(theme)),
});

const ThemeDropdownConnected = connect(() => ({}), mapDispatchToProps)(ThemeDropdown);

const ThemeSettings = (props: {}) => (
  <div>
    <Header dividing={true}>
      Text Theme
    </Header>
    <Grid columns={2} stackable={true}>
      <Grid.Column>
        <Field
          name="theme"
          component={ThemeDropdownConnected}
        />
      </Grid.Column>
      <Grid.Column>
        <ThemePreview />
      </Grid.Column>
    </Grid>
  </div>
);

export default ThemeSettings;
