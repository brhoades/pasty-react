import { Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { Container, Loader } from "semantic-ui-react";

import Maybe from "../monads/maybe";
import { IReducer } from "../reducers/index";
import { STATE } from "../reducers/paste";

export interface IPasteLoadingStateProps {
  error: boolean;
  message: string;
  state: STATE;
}

export interface IPasteLoadingProps {
}

type PropsType = IPasteLoadingStateProps & IPasteLoadingProps;

const PasteLoading = (props: PropsType) => (
  <Loader
    active={!props.error}
    indeterminate={true}
    content={props.message}
  />
);

const mapStateToProps = (state: IReducer, ownProps: IPasteLoadingProps): IPasteLoadingStateProps => ({
  error: state.messages.general.content !== "",
  message: state.paste.stateMessage,
  state: state.paste.state,
});

export default connect(mapStateToProps, () => ({}))(PasteLoading);
