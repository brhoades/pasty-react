import { Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import Container from "semantic-ui-react/dist/es/elements/Container";
import Dimmer from "semantic-ui-react/dist/es/modules/Dimmer";
import Progress from "semantic-ui-react/dist/es/modules/Progress";

import Maybe from "../monads/maybe";
import { IReducer } from "../reducers/index";
import { STATE } from "../reducers/paste";


export interface IPasteSubmittingStateProps {
  error: boolean;
  message: string;
  progress: number;
  state: STATE;
}

export interface IPasteSubmittingProps {
}

type PropsType = IPasteSubmittingStateProps & IPasteSubmittingProps;

const PasteSubmitting = (props: PropsType) => (
  <Dimmer active={!props.error} page={true}>
    <Progress
      percent={props.progress * 100}
      label={props.message}
      inverted={true}
      indicating={true}
      error={props.error}
      color="blue"
      style={{maxWidth: 600, marginRight: "auto", marginLeft: "auto"}}
    />
  </Dimmer>
);

const mapStateToProps = (state: IReducer, ownProps: IPasteSubmittingProps): IPasteSubmittingStateProps => {
  console.log(state.paste.progress);
  return ({
    error: state.messages.general.content !== "",
    message: state.paste.stateMessage,
    progress: state.paste.progress,
    state: state.paste.state,
  });
};

export default connect(mapStateToProps, () => ({}))(PasteSubmitting);
