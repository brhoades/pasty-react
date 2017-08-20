import * as React from "react";
import { Button } from "semantic-ui-react";

import LanguageDropdownButton from "../components/buttons/languagedropdownbutton";
import RemoveFileIcon from "../components/icons/removefileicon";

export interface IAddTextActionsProps {
  index: number;
}

const AddTextFileActionsContainer = (props: IAddTextActionsProps) => (
  <div style={{
    display: "inline-block",
  }}
  >
    <Button.Group>
      <RemoveFileIcon index={props.index} />
      <LanguageDropdownButton index={props.index} />
    </Button.Group>
  </div>
);

export default AddTextFileActionsContainer;
