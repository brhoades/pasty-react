import { Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import Container from "semantic-ui-react/dist/es/elements/Container";
import Dimmer from "semantic-ui-react/dist/es/modules/Dimmer";
import Progress from "semantic-ui-react/dist/es/modules/Progress";

import Maybe from "helpers/maybe";
import { STATE as CREATE_STATE } from "pages/paste/reducer";
import { STATE as VIEW_STATE } from "pages/view/reducer";
import { IReducer } from "reducers/index";


export interface IPasteLoadingStateProps {
  error: boolean;
  message: string;
  progress: number;
  state: CREATE_STATE | VIEW_STATE;
}

export interface IPasteLoadingProps {
  topBarLabel: string;
  bottomBarLabel: string;
  topBarKey: CREATE_STATE | VIEW_STATE;
  bottomBarKey: CREATE_STATE | VIEW_STATE;
  type: string;
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
  message: state[ownProps.type].stateMessage,
  progress: state[ownProps.type].progress,
  state: state[ownProps.type].state,
});

export default connect(mapStateToProps, () => ({}))(PasteLoading);
