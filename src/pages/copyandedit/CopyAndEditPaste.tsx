import { Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { getPaste } from "actions/creators";
import config from "configfile";
import { customInitialCreatePaste } from "pages/paste/CreatePaste";

import GenericNonIdealState from "components/GenericNonIdealState";
import PasteLoading from "components/PasteLoading";
import Maybe from "helpers/maybe";
import { STATE } from "pages/view/reducer";
import { PasteFileTypes } from "reducers/form";
import { IReducer } from "reducers/index";


export interface ICopyAndEditPasteProps {
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
}

export interface ICopyAndEditPasteStateProps {
  state: STATE;
  paste: Maybe<Paste>;
}

export interface ICopyAndEditPasteDispatchProps {
  getPasteAction: (id: string, key: string, highlight: number[][]) => void;
}

export interface ICopyAndEditPasteState {
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export type PropsType = ICopyAndEditPasteDispatchProps & ICopyAndEditPasteStateProps & ICopyAndEditPasteProps;

/*
  Behaves similarly to ViewPaste except that, when it's ready to view, it creates
  a custom CreatePaste form.
*/
export class CopyAndEditPaste extends React.Component<PropsType, ICopyAndEditPasteState> {
  public constructor(props) {
    super(props);

    this.state = {};
  }

  public componentWillMount() {
    if (!this.props.paste.isNothing()
        && this.props.paste.getData().name === this.props.match.params.id
        && this.props.paste.getData().key === this.props.match.params.key) {
      return;
    }

    this.props.getPasteAction(
      this.props.match.params.id,
      this.props.match.params.key,
      [],
    );
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  public render() {
    let files = {};

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

    if (this.state.error) {
      return (
        <GenericNonIdealState
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          action="copying and editing a paste"
        />
      );
    }

    if (!this.props.paste.isNothing()) {
      files = {
        files: this.props.paste.getData().files.map(f => ({
          ...f.serialize(),
          type: f.isReadable() ? PasteFileTypes.CODE : PasteFileTypes.FILE,
        })),
      };
    }

    return (
      this.props.state === STATE.VIEWING && React.createElement(customInitialCreatePaste(files))
    );
  }
}

export const mapStateToProps = (state: IReducer, ownProps: ICopyAndEditPasteProps)
                             : ICopyAndEditPasteStateProps => ({
  paste: state.viewPaste.paste,
  state: state.viewPaste.state,
});

export const mapDispatchToProps = (dispatch: Dispatch<IReducer>): ICopyAndEditPasteDispatchProps => ({
  getPasteAction: (id: string, key: string) => (
    dispatch(getPaste(id, key, [], `${config.get}${id}`))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CopyAndEditPaste);
