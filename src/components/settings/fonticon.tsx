import * as React from "react";
import { Field, WrappedFieldProps } from "redux-form";
import Radio from "semantic-ui-react/dist/es/addons/Radio";

import ButtonIconOrText from "../buttons/buttoniconortext";


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

    <ButtonIconOrText
      icon="download"
      text="Download this file"
      style={{
        marginLeft: "5em",
      }}
    />
  </div>
);

export default FontIconsSettings;
