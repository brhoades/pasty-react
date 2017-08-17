import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { Icon } from "semantic-ui-react";

import { getFileByIndexDefault, IFileByIndexPropsType } from "../../helpers/fileprops";
import { IReducer } from "../../reducers/index";


class DownloadFileIcon extends React.PureComponent<IFileByIndexPropsType> {
  public render() {
    if (this.props.file.isNothing()) {
      return null;
    }

    return (
      <a
        href={this.props.file.getData().base64DownloadString()}
        download={this.props.file.getData().name}
      >
        <Icon name="download" link={true} />
      </a>
    );
  }
}

export default connect(getFileByIndexDefault, () => ({}))(DownloadFileIcon);
