import * as Clipboard from "clipboard";
import { Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { Icon, Popup } from "semantic-ui-react";

import Maybe from "../../monads/maybe";
import { IReducer } from "../../reducers/index";

export interface ICopyShortLinkIconState {
  paste: Maybe<Paste>;
}

class CopyShortLinkIcon extends React.Component<ICopyShortLinkIconState, undefined> {
  public componentWillMount() {
    const clipboard = new Clipboard(".clipboard");
  }

  public render() {
    if (this.props.paste.isNothing()) {
      return null;
    }

    return (
      <div>
        <Popup
          basic={true}
          trigger={this.getIcon()}
          content="Copy to your clipboard a shorter link to this paste. TODO w/ server settings."
        />
      </div>
    );
  }

  private getShortURL() {
    // TODO: actually make this read from server settings. For now, just
    // copy the URL.
    return window.location.href;
  }

  private getIcon() {
    return (
      <a
        className="clipboard"
        data-clipboard-text={this.getShortURL()}
      >
        <Icon name="copy" size="large" link={true} />
      </a>
    );
  }
}

const mapStateToProps = (state: IReducer, ownProps: {}): ICopyShortLinkIconState => ({
  paste: state.paste.paste,
});

export default connect(mapStateToProps, () => ({}))(CopyShortLinkIcon);
