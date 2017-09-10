import * as React from "react";
import Menu from "semantic-ui-react/dist/es/collections/Menu";
import Container from "semantic-ui-react/dist/es/elements/Container";
import Header from "semantic-ui-react/dist/es/elements/Header";
import Icon from "semantic-ui-react/dist/es/elements/Icon";

import GeneralErrorMessage from "./generalerrormessage";


const debugItems = () => ([
  <Menu.Item href="#/view/myI22p0B/ggc_2ABIbA4Br20qBCu4K77tMLOBCEel" key="viewimage">
    View Image
  </Menu.Item>,
  <Menu.Item href="#/view/wpwONy0g/I5oaBMO1oIlmKulgGp46Me-A_dgpdyoE" key="codefile">
    Test Code File
  </Menu.Item>,
  <Menu.Item href="#/view/KnsiyfKF/cydhwk6K2xv20aHiPm3oI39dPbxJjeND" key="plainfile">
    Test Plain File
  </Menu.Item>,
  <Menu.Item href="#/view/okPGs0oN/s5wOrGLoFm9D6gvGs.Hr6ziq--vD_27-" key="badfile">
    Test Bad File
  </Menu.Item>,
  <Menu.Item href="#/view/okPGs0oN/r6ziq--vD_27-" key="badkey">
    Test Bad Key
  </Menu.Item>,
  <Menu.Item href="#/view/oN/s5wOrGLoFm9D6gvGs.Hr6ziq--vD_27-" key="missing">
    Test Missing File
  </Menu.Item>
]);

// We render extra menu items when we debug locally.
const getMenuItems = () => {
  let menu: JSX.Element[] = [
    <Menu.Item href="#/about" header={true} key="about" postion="left">PASTY</Menu.Item>,
    <Menu.Item href="#/" key="home">Paste</Menu.Item>,
  ];

  if (process.env.NODE_ENV !== "production") {
    menu = [...menu, ...debugItems()];
  }

  return [
    ...menu,
    <Menu.Item href="#/settings" key="settings" position="right">
      <Icon name="setting" inverted={true} />
      Settings
    </Menu.Item>,
  ];
}

const Layout = ({ children }) =>
  <div>
    <Menu inverted={true}>
      <Container>
        {...getMenuItems()}
      </Container>
    </Menu>

    <Container style={{ marginTop: "4em" }}>
      <GeneralErrorMessage key="generalerrrormessage" />
      {...children}
    </Container>
  </div>;

export default Layout;
