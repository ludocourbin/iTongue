import React, { useState } from "react";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

import Header from "./menu";

import "./header.scss";

const LayoutHeader = (props) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="menu">
            <Sidebar.Pushable as={Segment} fluid>
                <Sidebar
                    as={Menu}
                    animation="overlay"
                    icon="labeled"
                    onHide={() => setVisible(false)}
                    vertical
                    direction="right"
                    visible={visible}
                    width="thin"
                >
                    <Menu.Item as="a">
                        <Icon name="sidebar" />
                        Home
                    </Menu.Item>
                    <Menu.Item as="a">
                        <Icon name="gamepad" />
                        Games
                    </Menu.Item>
                    <Menu.Item as="a">
                        <Icon name="camera" />
                        Channels
                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={visible}>
                    <Header visible={visible} setVisible={setVisible} />
                    <div className="">{props.children}</div>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    );
};

export default LayoutHeader;
