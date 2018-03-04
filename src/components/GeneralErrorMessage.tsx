import * as React from "react";
import { connect, Dispatch } from "react-redux";
import Message from "semantic-ui-react/dist/es/collections/Message";

import { IReducer } from "reducers/index";


export interface IGeneralErrorMessageStateProps {
  content: string;
  header: string;
}

type PropsType = IGeneralErrorMessageStateProps;

const GeneralErrorMessage = (props: PropsType) => (
  props.content !== "" ? (
    <Message
      {...props}
      error={true}
    />
  ) : null
);

const mapStateToProps = (state: IReducer, ownProps: {}): IGeneralErrorMessageStateProps => ({
  content: state.messages.general.content,
  header: state.messages.general.header,
});


const mapDispatchToProps = (dispatch: Dispatch<IReducer>): {} => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(GeneralErrorMessage);
