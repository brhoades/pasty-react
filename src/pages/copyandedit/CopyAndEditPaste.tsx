import { Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";

import { customInitialCreatePaste } from "pages/paste/CreatePaste";
import ViewPaste from "pages/view/ViewPaste";

import Maybe from "helpers/maybe";
import { STATE as CREATE_STATE } from "pages/paste/reducer";
import { STATE as VIEW_STATE } from "pages/view/reducer";
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

export interface ICopyAndEditPasteDispatchProps {
  state: CREATE_STATE | VIEW_STATE;
  paste: Maybe<Paste>;
}

export type PropsType = ICopyAndEditPasteDispatchProps & ICopyAndEditPasteProps;

/*
   Loads a remote paste from url parameters and then allows
   editing. Hijacks a ViewPaste component and hides to load the
   paste. This is likely fragile.
*/
export class CopyAndEditPaste extends React.PureComponent<PropsType> {
  public render() {
    let files = {};

    if (!this.props.paste.isNothing()) {
      files = {
        files: this.props.paste.getData().files.map(f => ({
          ...f.serialize(),
          type: f.isReadable() ? PasteFileTypes.CODE : PasteFileTypes.FILE,
        })),
      };
    }


    return (
      <div>
        <ViewPaste
          hidden={true}
          location={this.props.location}
          match={this.props.match}
        />
        {this.props.state === VIEW_STATE.VIEWING && React.createElement(customInitialCreatePaste(files))}
      </div>
    );
  }
}

export const mapStateToProps = (state: IReducer, ownProps: ICopyAndEditPasteProps)
                             : ICopyAndEditPasteDispatchProps => ({
  paste: state.viewPaste.paste,
  state: state.viewPaste.state,
});

export default connect(mapStateToProps, {})(CopyAndEditPaste);
