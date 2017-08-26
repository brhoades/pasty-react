import * as Clipboard from "clipboard";
import { Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { Icon, Popup } from "semantic-ui-react";

import configuration from "../../../config";
import { generatePasteURL } from "../../middleware/highlight";
import Maybe from "../../monads/maybe";
import { IReducer } from "../../reducers/index";

export interface ICopyShortLinkIconState {
  paste: Maybe<Paste>;
  urlParams: string;
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
          content="Copy to your clipboard a shorter link to this paste"
        />
      </div>
    );
  }

  private getShortURL() {
    return `${configuration.shortURL}#${this.props.urlParams}`;
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
  // TODO: selector
  urlParams: generatePasteURL(state),
});

export default connect(mapStateToProps, () => ({}))(CopyShortLinkIcon);
