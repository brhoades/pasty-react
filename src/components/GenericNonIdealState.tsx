import * as React from "react";
import { connect } from "react-redux";

import Form from "semantic-ui-react/dist/es/collections/Form";

import NonIdealState from "components/NonIdealState";

export interface IGenericNonIdealStateProps {
  error: Error;
  errorInfo: React.ErrorInfo;
  action: string;
}

export interface IGenericNonIdealStateStateProps {
  state: string;
}

type PropsType = IGenericNonIdealStateProps & IGenericNonIdealStateStateProps;

const GenericNonIdealState = (props: PropsType) => {
  const descriptionPreStyle = {
    borderColor: "#aaa",
    borderStyle: "solid",
    borderWidth: "1px",
    maxHeight: "60vh",
    overflow: "scroll",
    padding: "1em",
    textAlign: "left",
    whiteSpace: "pre-wrap",
  };

  const description = (
    <React.Fragment>
      <p>
        An error occurred when {props.action} and it was not properly handled.
        Consider submitting the log below with details about what led to this error to the developers
        on <a href="https://github.com/brhoades/pasty-react/issues/new">brhoades/pasty-react</a>.
      </p>
      <pre style={descriptionPreStyle as any}>
        <code>
          {props.error.name} "{props.error.message}"
          {props.errorInfo.componentStack}
          <br />
          -----------------------<br />
          <br />
          {props.error.stack}
          <br />
          -----------------------<br />
          <br />
          Store at time of error:<br />
          {props.state}
        </code>
      </pre>
    </React.Fragment>
  );

  return (
    <NonIdealState
      icon="bug"
      iconText=""
      header="Something blew up"
      description={description}
    />
  );
};

const scrub = (v: any) => (v ? "<automatically removed>" : "");

export const mapStateToProps = (state, ownProps): IGenericNonIdealStateStateProps => ({
  state: JSON.stringify(
    Object.assign({}, state, {
      form: state.form.length && Object.keys(state.form).reduce((acc, f) => acc[f] = "<automatically removed>"),
      router: scrub(state.router),
      viewPaste: {
        ...state.viewPaste,
        id: scrub(state.viewPaste.id),
        key: scrub(state.viewPaste.key),
        paste: state.viewPaste.paste.isNothing() ? "" : "<automatically removed>",
      },
    }), null, 2,
  ),
});

export default connect(mapStateToProps, () => ({}))(GenericNonIdealState);
