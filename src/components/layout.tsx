import * as React from "react";
import {
  Container,
  Header,
  Menu,
} from "semantic-ui-react";

const Layout = ({ children }) =>
  <div>
    <Menu fixed="top" inverted={true}>
      <Container>
        <Menu.Item href="#/about" as="a" header={true}>PASTY</Menu.Item>
        <Menu.Item href="#/view/myI22p0B/ggc_2ABIbA4Br20qBCu4K77tMLOBCEel" as="a">
          View Image
        </Menu.Item>
        <Menu.Item href="#/view/wpwONy0g/I5oaBMO1oIlmKulgGp46Me-A_dgpdyoE">
          Test View Code
        </Menu.Item>
        <Menu.Item href="#/settings">
          Settings
        </Menu.Item>
      </Container>
    </Menu>

    <Container style={{ marginTop: "4em" }}>
      {...children}
    </Container>
  </div>;

export default Layout;
