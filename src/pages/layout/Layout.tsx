import * as React from "react";
import Menu from "semantic-ui-react/dist/es/collections/Menu";
import Container from "semantic-ui-react/dist/es/elements/Container";
import Icon from "semantic-ui-react/dist/es/elements/Icon";

import GeneralErrorMessage from "components/GeneralErrorMessage";
import GenericNonIdealState from "components/GenericNonIdealState";
import IconOrText from "components/IconOrText";


const debugItems = () => ([
  (
    <Menu.Item href="#/view/myI22p0B/ggc_2ABIbA4Br20qBCu4K77tMLOBCEel" key="viewimage">
      Bin (V2)
    </Menu.Item>
  ),
  (
    <Menu.Item href="#/view/wpwONy0g/I5oaBMO1oIlmKulgGp46Me-A_dgpdyoE" key="codefile">
      Cd (V2)
    </Menu.Item>
  ),
  (
    <Menu.Item href="#/view/KnsiyfKF/cydhwk6K2xv20aHiPm3oI39dPbxJjeND" key="plainfile">
      Tx (V2)
    </Menu.Item>
  ),
  (
    <Menu.Item href="#/view/okPGs0oN/s5wOrGLoFm9D6gvGs.Hr6ziq--vD_27-" key="badfile">
      Bad File
    </Menu.Item>
  ),
  (
    <Menu.Item href="#/view/okPGs0oN/r6ziq--vD_27-" key="badkey">
      Bad Key
    </Menu.Item>
  ),
  (
    <Menu.Item href="#/view/oN/s5wOrGLoFm9D6gvGs.Hr6ziq--vD_27-" key="missing">
      404
    </Menu.Item>
  ),
  (
    <Menu.Item href="#/view/E2HBEJs3/vBuO83c3FcHqnbh1_BLqd.rAhLnmI_qE" key="v3code">
      V3 Tx BSON
    </Menu.Item>
  ),
  (
    <Menu.Item href="#/view/BJwRQWIk/puq7oKwfI8d74.FjLb6xJ4j9w_yJ658h" key="v3binary">
      V3 Bin BSON
    </Menu.Item>
  ),
  (
    <Menu.Item href="#/view/ryIWBy7K/lhCwei6Pk.47__pJ9nq9Aax6wz2fAJxD" key="bigv3">
      V3 Big
    </Menu.Item>
  ),
  (
    <Menu.Item href="#/view/SkV9ta0Q/Bi__qFjhxua.a31sjyNcogrAEisyK-1r" key="v3mixed">
      V3 Mixed
    </Menu.Item>
  ),
  (
    <Menu.Item href="#/load" key="loading">
      Loading
    </Menu.Item>
  ),
]);

// We render extra menu items when we debug locally.
const getMenuItems = () => {
  let menu: JSX.Element[] = [
    <Menu.Item href="#/about" header={true} key="about" className="header">PASTY</Menu.Item>,
    <Menu.Item href="#/" key="home">Paste</Menu.Item>,
  ];

  if (process.env.NODE_ENV !== "production") {
    menu = [...menu, ...debugItems()];
  }

  return [
    ...menu,
    (
      <Menu.Item href="#/settings" key="settings" className="right">
        <IconOrText
          icon="setting"
          inverted={true}
          text="⚙&nbsp;"
        />
        Settings
      </Menu.Item>
    ),
  ];
};

interface ILayoutState {
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export default class Layout extends React.Component<{}, ILayoutState> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  public render() {
    if (this.state.error) {
      return (
        <div style={{ marginTop: "50px" }}>
          <GenericNonIdealState
            error={this.state.error}
            errorInfo={this.state.errorInfo}
            action="rendering the website"
          />
        </div>
      );
    }

    return (
      <React.Fragment>
        <Menu inverted={true}>
          <Container>
            {...getMenuItems()}
          </Container>
        </Menu>

        <Container>
          <GeneralErrorMessage key="generalerrormessage" />
          {this.props.children}
        </Container>
      </React.Fragment>
    );
  }
}
