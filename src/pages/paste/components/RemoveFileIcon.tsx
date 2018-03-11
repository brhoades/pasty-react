import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { arrayRemove } from "redux-form";
import Button from "semantic-ui-react/dist/es/elements/Button";
import Popup from "semantic-ui-react/dist/es/modules/Popup";

import ButtonIconOrText from "components/ButtonIconOrText";
import { getFileFormByIndexDefault, IFileFormByIndexPropsType } from "helpers/fileformprops";
import { IReducer } from "reducers/index";


interface IRemoveFileIconProps {
  index: number;
}

interface IRemoveFileIconDispatchProps {
  removeFile: () => void;
}

type PropsType = IRemoveFileIconProps & IRemoveFileIconDispatchProps;

class RemoveFileIcon extends React.Component<PropsType> {
  public render() {
    const trigger = (
      <ButtonIconOrText
        icon="trash"
        text="Remove file"
        onClick={this.props.removeFile}
      />
    );

    return (
      <Popup
        basic={true}
        trigger={trigger}
        content="Remove this file"
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IReducer>, ownProps: IRemoveFileIconProps)
                         : IRemoveFileIconDispatchProps => ({
  removeFile: () => dispatch(arrayRemove("createpaste", "files", ownProps.index)),
});

export default connect(getFileFormByIndexDefault, mapDispatchToProps)(RemoveFileIcon);
