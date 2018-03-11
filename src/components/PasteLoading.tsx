import { Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import Dimmer from "semantic-ui-react/dist/es/modules/Dimmer";
import Progress from "semantic-ui-react/dist/es/modules/Progress";

import Maybe from "helpers/maybe";
import { STATE as CREATE_STATE } from "pages/paste/reducer";
import { STATE as VIEW_STATE } from "pages/view/reducer";
import { IReducer } from "reducers/index";

import Loader from "components/Loader";

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
    height: "200px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "200px",
  };
  const topProgress = props.state === props.topBarKey ? props.progress * 100 : 100;
  const bottomProgress = props.state === props.bottomBarKey ? props.progress * 100 : 0;

  return (
    <Dimmer active={!props.error} page={true}>
      <div style={style}>
        <Loader
          progress={(props.progress * 100)}
          label={`${(props.progress * 100).toFixed(0)}`}
        />
      </div>
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
