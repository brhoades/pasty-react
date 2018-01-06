import * as React from "react";
import Button from "semantic-ui-react/dist/es/elements/Button";

import LanguageDropdownButton from "../components/buttons/languagedropdownbutton";
import RemoveFileIcon from "../components/icons/removefileicon";


export interface IAddFileActionsProps {
  index: number;
  children?: Element | JSX.Element;
}

const AddFileActionsContainer = (props: IAddFileActionsProps) => (
  <div
    style={{display: "inline-block"}}
  >
    <Button.Group>
      <RemoveFileIcon index={props.index} />
      {props.children}
    </Button.Group>
  </div>
);

export default AddFileActionsContainer;
