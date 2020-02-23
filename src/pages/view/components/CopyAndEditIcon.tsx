import { Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { replace } from "connected-react-router";
import Popup from "semantic-ui-react/dist/es/modules/Popup";

import IconOrText from "components/IconOrText";
import Maybe from "helpers/maybe";
import { generatePasteURL } from "middleware/highlight";
import { IReducer } from "reducers/index";


export interface ICopyAndEditIconState {
  paste: Maybe<Paste>;
}

export interface ICopyAndEditIconDispatch {
  redirect: (paste: Paste) => void;
}

type PropsType = ICopyAndEditIconState & ICopyAndEditIconDispatch;

class CopyAndEditIcon extends React.Component<PropsType> {
  public constructor(props) {
    super(props);

    this.redirectToCopy = this.redirectToCopy.bind(this);
  }

  public render() {
    if (this.props.paste.isNothing()) {
      return null;
    }

    return (
      <Popup
        basic={true}
        trigger={this.getIcon()}
        content="Copy and edit this paste"
      />
    );
  }

  private redirectToCopy(event) {
    return this.props.redirect(this.props.paste.getData());
  }

  private getIcon() {
    return (
      <a
        onClick={this.redirectToCopy}
      >
        <IconOrText
          icon="edit"
          text="Copy and Edit Paste"
          size="large"
          link={true}
        />
      </a>
    );
  }
}

const mapStateToProps = (state: IReducer, ownProps: {}): ICopyAndEditIconState => ({
  paste: state.viewPaste.paste,
});

const mapDispatchToProps = (dispatch: Dispatch<IReducer>): ICopyAndEditIconDispatch => ({
  redirect: (paste) => {
    dispatch(replace(`/paste/${encodeURI(paste.name)}/${encodeURI(paste.key)}`));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CopyAndEditIcon);
