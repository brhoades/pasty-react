import * as Clipboard from "clipboard";
import { Paste } from "pasty-core";
import * as React from "react";
import { connect, Dispatch } from "react-redux";
import Popup from "semantic-ui-react/dist/es/modules/Popup";

import IconOrText from "components/IconOrText";
import configuration from "configfile";
import Maybe from "helpers/maybe";
import { generatePasteURL } from "middleware/highlight";
import { IReducer } from "reducers/index";


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

    if (!configuration.shortURL) {
      return null;
    }

    return (
      <Popup
        basic={true}
        trigger={this.getIcon()}
        content="Copy to your clipboard a shorter link to this paste"
      />
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
        <IconOrText
          icon="copy"
          text="Copy Short Link"
          size="large"
          link={true}
        />
      </a>
    );
  }
}

const mapStateToProps = (state: IReducer, ownProps: {}): ICopyShortLinkIconState => ({
  paste: state.viewPaste.paste,
  // TODO: selector
  urlParams: generatePasteURL(state),
});

export default connect(mapStateToProps, () => ({}))(CopyShortLinkIcon);
