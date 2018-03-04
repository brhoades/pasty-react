import * as React from "react";
import { connect, Dispatch } from "react-redux";
import Popup from "semantic-ui-react/dist/es/modules/Popup";

import ButtonIconOrText from "components/ButtonIconOrText";
import { getFileByIndexDefault, IFileByIndexPropsType } from "helpers/fileprops";
import { IReducer } from "reducers/index";


class DownloadFileButton extends React.Component<IFileByIndexPropsType> {
  public render() {
    if (this.props.file.isNothing()) {
      return null;
    }

    const trigger = (
      <a
        href={this.props.file.getData().base64DownloadString()}
        download={this.props.file.getData().name}
      >
        <ButtonIconOrText
          text="Download File"
          icon="download"
        />
      </a>
    );

    return (
      <div>
        <Popup
          basic={true}
          trigger={trigger}
          content="Download this file"
        />
      </div>
    );
  }
}

export default connect(getFileByIndexDefault, () => ({}))(DownloadFileButton);
