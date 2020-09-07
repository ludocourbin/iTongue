import React, { Component } from "react";
import { Accordion, Icon, Header } from "semantic-ui-react";
import Layout from "../../containers/Layout";
import "./style.scss";

export default class Terms extends Component {
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
            <Layout titlePage="Terms">
                <div className="terms-container">
                    <Header as="h4" block className="titleTerms">
                        <p>
                            Please read these Terms of Use carefully before using this
                            site.
                        </p>
                        <p>
                            By logging on to this site, you accept these terms and
                            conditions unconditionally.
                        </p>
                    </Header>
                    <Accordion styled className="accordionTerms">
                        <Accordion.Title
                            active={activeIndex === 0}
                            index={0}
                            onClick={this.handleClick}
                        >
                            <Icon name="dropdown" />
                            Terms of use
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 0}>
                            <p>
                                The site is accessible by the url{" "}
                                <a href="https://itongue.io">https://itongue.io</a> and is
                                operated in compliance with French legislation.
                            </p>

                            <p>
                                The use of this website is governed by the present general
                                conditions.
                            </p>
                            <p>
                                By using this website, you acknowledge having read and
                                accepted these conditions. They can be modified at any
                                time and without notice by the company iTongue. iTongue
                                could not be held responsible in any way for a bad use of
                                the service.
                            </p>
                        </Accordion.Content>

                        <Accordion.Title
                            active={activeIndex === 1}
                            index={1}
                            onClick={this.handleClick}
                        >
                            <Icon name="dropdown" />
                            Limitation of Liability
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 1}>
                            <p>
                                The information contained on this website is as accurate
                                as possible and the site is periodically updated, but may
                                contain inaccuracies, omissions or gaps.
                            </p>
                            <p>
                                If you notice a gap, error or what appears to be a
                                malfunction, please report it by email describing the
                                problem as precisely as possible (page causing the
                                problem, action triggered, type of computer and browser
                                used, ...).
                            </p>
                            <p>
                                Any downloaded content is at the user's own risk and under
                                his sole responsibility.
                            </p>

                            <p>
                                Consequently, iTongue cannot be held responsible for any
                                damage to the user's computer or any loss of data
                                following the download. The photos are not contractual.
                            </p>
                            <p>
                                The hypertext links set up within the framework of the
                                present website towards other resources present on the
                                Internet network do not would know how to engage the
                                responsibility of Natural net.
                            </p>
                        </Accordion.Content>

                        <Accordion.Title
                            active={activeIndex === 2}
                            index={2}
                            onClick={this.handleClick}
                        >
                            <Icon name="dropdown" />
                            Right of access
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 2}>
                            <p>
                                In application of this law, Internet users have the right
                                to access, rectify, modify and delete data concerning them
                                personally.
                            </p>
                            <p>
                                This right can be exercised electronically at the
                                following email address: contact@itongue.io.
                            </p>
                            <p>
                                The personal information collected is in no case entrusted
                                to third parties except for the possible good execution of
                                the service ordered by the Internet user.
                            </p>
                        </Accordion.Content>

                        <Accordion.Title
                            active={activeIndex === 3}
                            index={3}
                            onClick={this.handleClick}
                        >
                            <Icon name="dropdown" />
                            Privacy Policy
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 3}>
                            <p>
                                Your personal data are confidential and will not be
                                communicated to third parties under any circumstances
                                except for the proper execution of the service.
                            </p>
                        </Accordion.Content>

                        <Accordion.Title
                            active={activeIndex === 4}
                            index={4}
                            onClick={this.handleClick}
                        >
                            <Icon name="dropdown" />
                            Cookies
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 4}>
                            <p>
                                For statistical and display purposes, this website uses
                                cookies. These are small text files stored on your hard
                                drive to record technical data about your navigation. Some
                                parts of this site cannot be functional without the
                                acceptance of cookies.
                            </p>
                        </Accordion.Content>
                    </Accordion>
                </div>
            </Layout>
        );
    }
}
