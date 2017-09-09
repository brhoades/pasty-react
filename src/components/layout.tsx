import * as React from "react";
import {
  Container,
  Header,
  Menu,
} from "semantic-ui-react";

import GeneralErrorMessage from "./generalerrormessage";

const debugItems = () => ([
  <Menu.Item href="#/view/myI22p0B/ggc_2ABIbA4Br20qBCu4K77tMLOBCEel" as="a" key="viewimage">
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
    <Menu.Item href="#/about" as="a" header={true} key="about">PASTY</Menu.Item>,
    <Menu.Item href="#/" as="a" key="home">Paste</Menu.Item>,
  ];

  if (process.env.NODE_ENV !== "production") {
    menu = [...menu, ...debugItems()];
  }

  return [
    ...menu,
    <Menu.Item href="#/settings" key="settings">Settings</Menu.Item>,
  ];
}

const Layout = ({ children }) =>
  <div>
    <Menu fixed="top" inverted={true}>
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
