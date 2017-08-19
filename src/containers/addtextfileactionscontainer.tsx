import * as React from "react";

import RemoveFileIcon from "../components/icons/removefileicon";

export interface IAddTextActionsProps {
  index: number;
}

const AddTextFileActionsContainer = (props: IAddTextActionsProps) => (
  <div style={{
    float: "right",
  }}
  >
    <RemoveFileIcon index={props.index} />
  </div>
);

export default AddTextFileActionsContainer;
