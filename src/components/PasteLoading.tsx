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
  progress: number;
  state: CREATE_STATE | VIEW_STATE;
}

export interface IPasteLoadingProps {
  firstStageKey: CREATE_STATE | VIEW_STATE;
  firstStageLabel: string;
  secondStageKey: CREATE_STATE | VIEW_STATE;
  secondStageLabel: string;
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

  return (
    <Dimmer active={!props.error} page={true}>
      <div style={style}>
        <Loader
          progress={props.progress * 100 % 100}
          indeterminateLabel="Loading"
          label={`${(props.progress * 100).toFixed(0)}%`}
          subLabel={props.state === props.secondStageKey ? props.secondStageLabel : props.firstStageLabel}
          secondStage={props.state === props.secondStageKey}
        />
      </div>
    </Dimmer>
  );
};

const mapStateToProps = (state: IReducer, ownProps: IPasteLoadingProps): IPasteLoadingStateProps => ({
  error: state.messages.general.content !== "",
  progress: state[ownProps.type].progress,
  state: state[ownProps.type].state,
});

export default connect(mapStateToProps, () => ({}))(PasteLoading);
