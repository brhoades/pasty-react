import * as React from "react";
import { Field, WrappedFieldProps } from "redux-form";
import Radio from "semantic-ui-react/dist/es/addons/Radio";

import Button from "semantic-ui-react/dist/es/elements/Button";
import IconOrText from "../icons/iconortext";


interface IUseFontIconsToggle {
}

const UseFontIconsToggle = (props: WrappedFieldProps & IUseFontIconsToggle) => (
  <Radio
    toggle={true}
    onChange={(ev, data) => props.input.onChange(data.checked)}
    checked={props.input.value}
    label="Use font icons"
  />
);

const FontIconsSettings = () => (
  <div>
    <Field
      name="fonticons"
      component={UseFontIconsToggle}
    />

    <Button
      style={{
        marginLeft: "2em",
      }}
      compact={true}
    >
      <IconOrText
        icon="download"
        text="Download this file"
      />
    </Button>
  </div>
);

export default FontIconsSettings;
