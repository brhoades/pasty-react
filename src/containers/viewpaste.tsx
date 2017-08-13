import { Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";

import DisplayFile from "../components/displayfile";

import { clearPaste, getPaste } from "../actions/creators";
import Maybe from "../monads/maybe";
import { IReducer } from "../reducers/index";
import { STATE } from "../reducers/paste";

export interface IViewPasteStateProps {
  state: STATE;
  paste: Maybe<Paste>;
}

export interface IViewPasteDispatchProps {
  getPasteAction: (id: string, key: string) => void;
  clearPasteAction: (id: string) => void;
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
}

type PropsType = IViewPasteStateProps & IViewPasteDispatchProps & IViewPasteProps;

export class ViewPaste extends React.Component<PropsType, undefined> {
  constructor(props) {
    super(props);

    this.props.getPasteAction(this.props.match.params.id, this.props.match.params.key);
  }

  public componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id
        || this.props.match.params.key !== newProps.match.params.key) {
      this.props.getPasteAction(newProps.match.params.id, newProps.match.params.key);
    }
  }

  public componentWillUnmount() {
    this.props.clearPasteAction(this.props.match.params.id);
  }

  public render() {
    if (this.props.state !== STATE.VIEWING) {
      return null;
    }

    return (
      <div>
        <h2>{this.props.paste.getData().name}</h2>
        {this.renderPastes()}
      </div>
    );
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

const mapStateToProps = (state: IReducer, ownProps: IViewPasteProps): IViewPasteStateProps => ({
  paste: state.paste.paste,
  state: state.paste.downloadState,
});

const mapDispatchToProps = (dispatch: Dispatch<IReducer>): IViewPasteDispatchProps => ({
  clearPasteAction: (id: string) => dispatch(clearPaste(id)),
  getPasteAction: (id: string, key: string) => dispatch(getPaste(id, key, `https://pasty.brod.es/get/${id}`)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewPaste);

