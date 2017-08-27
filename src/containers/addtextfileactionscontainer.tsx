import * as React from "react";
import { Button } from "semantic-ui-react";

import LanguageDropdownButton from "../components/buttons/languagedropdownbutton";
import AddFileActionsContainer from "./addfileactionscontainer";

export interface IAddTextFileActionsProps {
  index: number;
}

const AddTextFileActionsContainer = (props: IAddTextFileActionsProps) => (
  <AddFileActionsContainer index={props.index}>
    <LanguageDropdownButton index={props.index} />
  </AddFileActionsContainer>
);

export default AddTextFileActionsContainer;
