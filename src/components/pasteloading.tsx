import { Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import Container from "semantic-ui-react/dist/es/elements/Container";
import Dimmer from "semantic-ui-react/dist/es/modules/Dimmer";
import Progress from "semantic-ui-react/dist/es/modules/Progress";

import Maybe from "../monads/maybe";
import { IReducer } from "../reducers/index";
import { STATE, STATE_MESSAGES } from "../reducers/paste";


export interface IPasteLoadingStateProps {
  error: boolean;
  message: string;
  progress: number;
  state: STATE;
}

export interface IPasteLoadingProps {
  topBarLabel: string;
  bottomBarLabel: string;
  topBarKey: STATE;
  bottomBarKey: STATE;
}

type PropsType = IPasteLoadingStateProps & IPasteLoadingProps;

const PasteLoading = (props: PropsType) => {
  const style = {
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 600,
  };
  const topProgress = props.state === props.topBarKey ? props.progress * 100 : 100;
  const bottomProgress = props.state === props.bottomBarKey ? props.progress * 100 : 0;

  return (
    <Dimmer active={!props.error} page={true}>
      <Progress
        percent={topProgress}
        label={props.topBarLabel}
        inverted={true}
        indicating={true}
        error={props.error}
        color="blue"
        style={style}
        success={topProgress >= 100}
        progress={true}
        precision={0}
      />
      <Progress
        percent={bottomProgress}
        label={props.bottomBarLabel}
        inverted={true}
        indicating={topProgress >= 100}
        error={props.error}
        color="blue"
        style={style}
        success={bottomProgress >= 100}
        progress={true}
        precision={0}
      />
    </Dimmer>
  );
};

const mapStateToProps = (state: IReducer, ownProps: IPasteLoadingProps): IPasteLoadingStateProps => ({
  error: state.messages.general.content !== "",
  message: state.paste.stateMessage,
  progress: state.paste.progress,
  state: state.paste.state,
});

export default connect(mapStateToProps, () => ({}))(PasteLoading);
