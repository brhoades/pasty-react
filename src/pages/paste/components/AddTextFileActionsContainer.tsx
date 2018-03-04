import * as React from "react";
import Button from "semantic-ui-react/dist/es/elements/Button";

import AddFileActionsContainer from "./AddFileActionsContainer";
import LanguageDropdownButton from "./buttons/LanguageDropdownButton";


export interface IAddTextFileActionsProps {
  index: number;
}

const AddTextFileActionsContainer = (props: IAddTextFileActionsProps) => (
  <AddFileActionsContainer index={props.index}>
    <LanguageDropdownButton index={props.index} />
  </AddFileActionsContainer>
);

export default AddTextFileActionsContainer;
