import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { Field, reduxForm, WrappedFieldProps } from "redux-form";
import Grid from "semantic-ui-react/dist/es/collections/Grid";
import Header from "semantic-ui-react/dist/es/elements/Header";
import Dropdown from "semantic-ui-react/dist/es/modules/Dropdown";

import { loadTheme } from "actions/creators";
import { IReducer } from "reducers/index";
import ThemePreview from "./ThemePreview";


const themes = [ // tslint:disable-next-line:max-line-length
  "agate", "androidstudio", "arduino-light", "arta", "ascetic", "atelier-cave-dark", "atelier-cave-light", "atelier-dune-dark", "atelier-dune-light", "atelier-estuary-dark", "atelier-estuary-light", "atelier-forest-dark", "atelier-forest-light", "atelier-heath-dark", "atelier-heath-light", "atelier-lakeside-dark", "atelier-lakeside-light", "atelier-plateau-dark", "atelier-plateau-light", "atelier-savanna-dark", "atelier-savanna-light", "atelier-seaside-dark", "atelier-seaside-light", "atelier-sulphurpool-dark", "atelier-sulphurpool-light", "atom-one-dark", "atom-one-light", "brown-paper", "codepen-embed", "color-brewer", "darcula", "dark", "darkula", "default", "docco", "dracula", "far", "foundation", "github", "github-gist", "googlecode", "grayscale", "gruvbox-dark", "gruvbox-light", "hopscotch", "hybrid", "idea", "ir-black", "kimbie.dark", "kimbie.light", "magula", "mono-blue", "monokai", "monokai-sublime", "obsidian", "ocean", "paraiso-dark", "paraiso-light", "pojoaque", "purebasic", "qtcreator_dark", "qtcreator_light", "railscasts", "rainbow", "routeros", "school-book", "solarized-dark", "solarized-light", "sunburst", "tomorrow", "tomorrow-night-blue", "tomorrow-night-bright", "tomorrow-night", "tomorrow-night-eighties", "vs2015", "vs", "xcode", "xt256", "zenburn",
];

const ThemeDropdown = (props: WrappedFieldProps) => {
  const onChange = (ev, data) => {
    props.meta.dispatch(loadTheme(data.value as string));
    props.input.onChange(data.value);
  };

  const options = themes.map(theme => ({
    text: theme,
    value: `${theme}.css`,
  }));

  return (
    <Dropdown
      search={true}
      selection={true}
      options={options}
      value={props.input.value}
      onChange={onChange}
    />
  );
};


const ThemeSettings = (props: {}) => (
  <React.Fragment>
    <Header dividing={true}>
      Text Theme
    </Header>
    <Field
      name="theme"
      component={ThemeDropdown as any} // complaints about missing input/meta
    />
    <ThemePreview />
  </React.Fragment>
);

export default ThemeSettings;
