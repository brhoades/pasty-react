import { Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import Container from "semantic-ui-react/dist/es/elements/Container";
import Loader from "semantic-ui-react/dist/es/elements/Loader";

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
