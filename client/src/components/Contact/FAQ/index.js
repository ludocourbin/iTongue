import React, { Component } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import "./style.scss";

export default class FAQ extends Component {
    state = { activeIndex: 99 };

    handleClick = (e, titleProps) => {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({ activeIndex: newIndex });
    };

    render() {
        const { activeIndex } = this.state;

        return (
            <div className="faq-div">
                <Accordion styled>
                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={this.handleClick}
                    >
                        <Icon name="dropdown" />I want to sign up ? How do I do it ?
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <p>At the top of the screen there is a hamburger-shaped icon. </p>
                        <p>
                            On click, a drop-down menu appears. All you have to do is
                            click on "Sign up" and fill in your details.
                        </p>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={this.handleClick}
                    >
                        <Icon name="dropdown" />I would like to create an iRecord.
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <p>
                            You can only create a new iRecord if you have a profile and
                            are logged in.
                        </p>
                        <p>
                            Once logged in, at the bottom of your screen, you have a menu
                            bar with several icons.
                        </p>

                        <p>Click on the microphone shaped icon and record yourself!</p>
                    </Accordion.Content>
                </Accordion>
            </div>
        );
    }
}
