import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { arrayRemove } from "redux-form";
import { Icon, Popup } from "semantic-ui-react";

import { getFileFormByIndexDefault, IFileFormByIndexPropsType } from "../../helpers/fileformprops";
import { IReducer } from "../../reducers/index";

interface IRemoveFileIconProps {
  index: number;
}

interface IRemoveFileIconDispatchProps {
  removeFile: () => void;
}

type PropsType = IRemoveFileIconProps & IRemoveFileIconDispatchProps;

class RemoveFileIcon extends React.Component<PropsType, undefined> {
  public render() {
    return (
      <div>
        <Popup
          basic={true}
          trigger={
            <a
              onClick={this.props.removeFile}
            >
              <Icon name="trash" link={true} />
            </a>
          }
          content="Remove this file"
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IReducer>, ownProps: IRemoveFileIconProps)
                         : IRemoveFileIconDispatchProps => ({
  removeFile: () => dispatch(arrayRemove("createpaste", "files", ownProps.index)),
});

export default connect(getFileFormByIndexDefault, mapDispatchToProps)(RemoveFileIcon);
