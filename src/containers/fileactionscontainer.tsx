import * as React from "react";
import { Icon } from "semantic-ui-react";

import DownloadFileIcon from "../components/icons/downloadfileicon";

export interface IFileActionsProps {
  index: number;
}

const FileActionsContainer = (props: IFileActionsProps) => (
  <div style={{
    float: "right",
  }}
  >
    <DownloadFileIcon index={props.index} />
  </div>
);

export default FileActionsContainer;
