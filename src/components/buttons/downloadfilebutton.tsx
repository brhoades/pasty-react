import * as React from "react";
import { connect, Dispatch } from "react-redux";
import Popup from "semantic-ui-react/dist/es/modules/Popup";

import { getFileByIndexDefault, IFileByIndexPropsType } from "../../helpers/fileprops";
import { IReducer } from "../../reducers/index";
import ButtonIconOrText from "../buttons/buttoniconortext";


class DownloadFileButton extends React.Component<IFileByIndexPropsType> {
  public render() {
    if (this.props.file.isNothing()) {
      return null;
    }

    return (
      <div>
        <Popup
          basic={true}
          trigger={
          <a
            href={this.props.file.getData().base64DownloadString()}
            download={this.props.file.getData().name}
          >
            <ButtonIconOrText
              text="Download File"
              icon="download"
            />
          </a>
          }
          content="Download this file"
        />
      </div>
    );
  }
}

export default connect(getFileByIndexDefault, () => ({}))(DownloadFileButton);
