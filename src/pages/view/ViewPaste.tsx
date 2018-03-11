import range from "lodash/range";
import { Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import _ = require("underscore");

import { clearPaste, getPaste, setHighlightedLines } from "actions/creators";
import config from "configfile";
import Maybe from "helpers/maybe";
import { IReducer } from "reducers/index";

import GenericNonIdealState from "components/GenericNonIdealState";
import PasteLoading from "components/PasteLoading";
import CopyAndEditIcon from "./components/CopyAndEditIcon";
import CopyShortLinkIcon from "./components/CopyShortLinkIcon";
import DisplayFile from "./components/DisplayFile";
import { STATE } from "./reducer";

export interface IViewPasteState {
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export interface IViewPasteStateProps {
  error: boolean;
  state: STATE;
  paste: Maybe<Paste>;
}

export interface IViewPasteDispatchProps {
  getPasteAction: (id: string, key: string, highlight: number[][]) => void;
  clearPasteAction: (id: string) => void;
  setHighlightedLines: (index: number, lines: number[]) => void;
}

export interface IViewPasteProps {
  location: {
    pathname: string,
  };
  match: {
    params: {
      id: string,
      key: string,
      extra?: string,
    },
  };
  hidden?: boolean;
}

type PropsType = IViewPasteStateProps & IViewPasteDispatchProps & IViewPasteProps;

export class ViewPaste extends React.Component<PropsType, IViewPasteState> {
  public static defaultProps: Partial<IViewPasteProps> = {
    // for loading pastes in the background. Hides the display.
    hidden: false,
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.updatePaste(this.props);
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  public componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id
        || this.props.match.params.key !== newProps.match.params.key) {
        this.updatePaste(newProps);
    }
  }

  public render() {
    if (this.props.error) {
      return null;
    }

    if (this.state.error) {
      return (
        <GenericNonIdealState error={this.state.error} errorInfo={this.state.errorInfo} action="viewing a paste" />
      );
    }

    if (this.props.state !== STATE.VIEWING) {
      return (
        <PasteLoading
          firstStageLabel="Downloaded"
          secondStageLabel="Decrypted"
          firstStageKey={STATE.DOWNLOADING}
          secondStageKey={STATE.DECRYPTING}
          type="viewPaste"
        />
      );
    }

    if (this.props.hidden) {
      return null;
    }

    return (
      <React.Fragment>
        <h2
          style={{ display: "inline-block", paddingBottom: "1em" }}
        >
          {this.props.paste.getData().name}
        </h2>
        <div
          style={{ float: "right" }}
        >
          <CopyAndEditIcon />
          <CopyShortLinkIcon />
        </div>

        {this.renderPastes()}
      </React.Fragment>
    );
  }

  private updatePaste(props: PropsType) {
    // If we're redirecting from a submitted paste, don't redownload.
    if (!props.paste.isNothing() && props.paste.getData().name === props.match.params.id
        && props.paste.getData().key === props.match.params.key) {
      return;
    }

    let lines: number[][] = [];

    // Once paste loads add highlighted lines.
    if (props.match.params.extra) {
      lines = props.match.params.extra.split(";")
                   .map(this.unserializeLineNumbers);
    }

    props.getPasteAction(props.match.params.id, props.match.params.key, lines);
  }

  private unserializeLineNumbers(lines: string): number[] {
    return lines.split(",").reduce((acc: number[], e: string) => {
      if (/-/.test(e)) {
        const [lower, upper] = e.split("-");

        return [...acc, ..._.range(parseInt(lower, 10) - 1, parseInt(upper, 10) - 1)];
      }

      return [...acc, parseInt(e, 10) - 1];
    }, []);
  }

  private renderPastes() {
    return this.props.paste.getData().files.map((f, index) => {
      return (
        <DisplayFile
          key={f.id}
          index={index}
        />
      );
    });
  }
}

export const mapStateToProps = (state, ownProps): IViewPasteStateProps => ({
  error: state.messages.general.header !== "",
  paste: state.viewPaste.paste,
  state: state.viewPaste.state,
});

export const mapDispatchToProps = (dispatch: Dispatch<IReducer>): IViewPasteDispatchProps => ({
  clearPasteAction: (id: string) => dispatch(clearPaste(id)),
  getPasteAction: (id: string, key: string, highlight: number[][]) => (
    dispatch(getPaste(id, key, highlight, `${config.get}${id}`))
  ),
  setHighlightedLines: (index: number, lines: number[]) => dispatch(setHighlightedLines(index, lines)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewPaste);

