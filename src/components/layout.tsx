import * as React from "react";
import {
  Container,
  Header,
  Menu,
} from "semantic-ui-react";

import GeneralErrorMessage from "./generalerrormessage";

const Layout = ({ children }) =>
  <div>
    <Menu fixed="top" inverted={true}>
      <Container>
        <Menu.Item href="#/about" as="a" header={true}>PASTY</Menu.Item>
        <Menu.Item href="#/" as="a">
          Paste
        </Menu.Item>
        <Menu.Item href="#/view/myI22p0B/ggc_2ABIbA4Br20qBCu4K77tMLOBCEel" as="a">
          View Image
        </Menu.Item>
        <Menu.Item href="#/view/wpwONy0g/I5oaBMO1oIlmKulgGp46Me-A_dgpdyoE">
          Test Code File
        </Menu.Item>
        <Menu.Item href="#/view/KnsiyfKF/cydhwk6K2xv20aHiPm3oI39dPbxJjeND">
          Test Plain File
        </Menu.Item>
        <Menu.Item href="#/view/okPGs0oN/s5wOrGLoFm9D6gvGs.Hr6ziq--vD_27-">
          Test Bad File
        </Menu.Item>
        <Menu.Item href="#/view/okPGs0oN/r6ziq--vD_27-">
          Test Bad Key
        </Menu.Item>
        <Menu.Item href="#/view/oN/s5wOrGLoFm9D6gvGs.Hr6ziq--vD_27-">
          Test Missing File
        </Menu.Item>
        <Menu.Item href="#/settings">
          Settings
        </Menu.Item>
      </Container>
    </Menu>

    <Container style={{ marginTop: "4em" }}>
      <GeneralErrorMessage key="generalerrrormessage" />
      {...children}
    </Container>
  </div>;

export default Layout;
