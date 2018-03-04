import * as React from "react";
import Button from "semantic-ui-react/dist/es/elements/Button";

import DownloadFileButton from "./DownloadFileButton";


export interface IFileActionsProps {
  index: number;
}

const FileActionsContainer = (props: IFileActionsProps) => (
  <div style={{ float: "right" }}>
    <Button.Group>
      <DownloadFileButton index={props.index} />
    </Button.Group>
  </div>
);

export default FileActionsContainer;
