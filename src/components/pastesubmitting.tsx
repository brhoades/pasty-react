import { Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import Container from "semantic-ui-react/dist/es/elements/Container";
import Dimmer from "semantic-ui-react/dist/es/modules/Dimmer";
import Progress from "semantic-ui-react/dist/es/modules/Progress";

import Maybe from "../monads/maybe";
import { IReducer } from "../reducers/index";
import { STATE, STATE_MESSAGES } from "../reducers/paste";


export interface IPasteSubmittingStateProps {
  error: boolean;
  message: string;
  progress: number;
  state: STATE;
}

export interface IPasteSubmittingProps {
}

type PropsType = IPasteSubmittingStateProps & IPasteSubmittingProps;

const PasteSubmitting = (props: PropsType) => {
  const style = {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 600,
  };
  const encryptProgress = props.state === STATE.ENCRYPTING ? props.progress * 100 : 100;
  const uploadProgress = props.state === STATE.UPLOADING ? props.progress * 100 : 0;

  return (
    <Dimmer active={!props.error} page={true}>
      <Progress
        percent={encryptProgress}
        label={"Encrypt"}
        inverted={true}
        indicating={true}
        error={props.error}
        color="blue"
        style={style}
        success={encryptProgress >= 100}
      />
      <Progress
        percent={uploadProgress}
        label={"Upload"}
        inverted={true}
        indicating={true}
        error={props.error}
        color="blue"
        style={style}
        success={uploadProgress >= 100}
      />
    </Dimmer>
  );
};

const mapStateToProps = (state: IReducer, ownProps: IPasteSubmittingProps): IPasteSubmittingStateProps => ({
  error: state.messages.general.content !== "",
  message: state.paste.stateMessage,
  progress: state.paste.progress,
  state: state.paste.state,
});

export default connect(mapStateToProps, () => ({}))(PasteSubmitting);
