import range from "lodash/range";
import { Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";

import DisplayFile from "../components/displayfile";
import CopyAndEditIcon from "../components/icons/copyandediticon";
import CopyShortLinkIcon from "../components/icons/copyshortlinkicon";
import PasteLoading from "../components/pasteloading";

import config from "../../config";
import { clearPaste, getPaste, setHighlightedLines, setInitialHighlightedLines } from "../actions/creators";
import Maybe from "../monads/maybe";
import { IReducer } from "../reducers/index";
import { STATE } from "../reducers/paste";


export interface IViewPasteStateProps {
  error: boolean;
  state: STATE;
  paste: Maybe<Paste>;
}

export interface IViewPasteDispatchProps {
  getPasteAction: (id: string, key: string) => void;
  clearPasteAction: (id: string) => void;
  setHighlightedLines: (index: number, lines: number[]) => void;
  setInitialHighlightedLines: (index: number, lines: number[]) => void;
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

export class ViewPaste extends React.Component<PropsType> {
  public static defaultProps: Partial<IViewPasteProps> = {
    // for loading pastes in the background. Hides the display.
    hidden: false,
  };

  constructor(props) {
    super(props);

    this.updatePaste(this.props);
  }

  public componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id
        || this.props.match.params.key !== newProps.match.params.key) {
        this.updatePaste(newProps);
    }

    // Once paste loads add highlighted lines.
    if (newProps.state === STATE.VIEWING && !newProps.paste.isNothing()) {
      if (newProps.match.params.extra) {
        newProps.match.params.extra.split(";")
             .map(this.unserializeLineNumbers)
             .map((f, i) => newProps.setInitialHighlightedLines(i, f));
      }
    }
  }

  public render() {
    if (this.props.error) {
      return (<div />);
    }

    if (this.props.state !== STATE.VIEWING) {
      return (
        <PasteLoading
          topBarLabel="Download"
          bottomBarLabel="Decrypt"
          topBarKey={STATE.DOWNLOADING}
          bottomBarKey={STATE.DECRYPTING}
        />
      );
    }

    if (this.props.hidden) {
      return null;
    }

    return (
      <div>
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
      </div>
    );
  }

  private updatePaste(props: PropsType) {
    // If we're redirecting from a submitted paste, don't redownload.
    if (!props.paste.isNothing() && props.paste.getData().name === props.match.params.id
        && props.paste.getData().key === props.match.params.key) {
      return;
    }

    props.getPasteAction(props.match.params.id, props.match.params.key);
  }

  private unserializeLineNumbers(lines: string): number[] {
    return lines.split(",").reduce((acc: number[], e: string) => {
      if (/-/.test(e)) {
        const [lower, upper] = e.split("-");

        return [...acc, ...range(parseInt(lower, 10) - 1, parseInt(upper, 10) - 1)];
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

export const mapStateToProps = (state: IReducer, ownProps: IViewPasteProps): IViewPasteStateProps => ({
  error: state.messages.general.header !== "",
  paste: state.paste.paste,
  state: state.paste.state,
});

export const mapDispatchToProps = (dispatch: Dispatch<IReducer>): IViewPasteDispatchProps => ({
  clearPasteAction: (id: string) => dispatch(clearPaste(id)),
  getPasteAction: (id: string, key: string) => dispatch(getPaste(id, key, `${config.get}${id}`)),
  setHighlightedLines: (index: number, lines: number[]) => dispatch(setHighlightedLines(index, lines)),
  setInitialHighlightedLines: (index: number, lines: number[]) => (
    dispatch(setInitialHighlightedLines(index, lines))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewPaste);

