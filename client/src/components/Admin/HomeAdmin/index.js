import React from "react";

/* Components */
import { Segment, Statistic, Icon } from "semantic-ui-react";
import HeaderAdmin from "../../../containers/Admin/HeaderAdmin";

/* Style */
import "./homeadmin.scss";

const HomeAdmin = ({ userConnect }) => {

    return (
        <HeaderAdmin>
            <div className="home-admin">
                <Segment>
                    <Statistic.Group widths="four">
                        <Statistic>
                            <Statistic.Value>200</Statistic.Value>
                            <Statistic.Label>
                                <Icon name="user" />
                                Utilisateurs
                            </Statistic.Label>
                        </Statistic>
                        <Statistic>
                            <Statistic.Value>1548</Statistic.Value>
                            <Statistic.Label>
                                <Icon name="microphone" />
                                iRecords
                            </Statistic.Label>
                        </Statistic>
                        <Statistic>
                            <Statistic.Value>5</Statistic.Value>
                            <Statistic.Label>
                                <Icon name="flag" />
                                Langues
                            </Statistic.Label>
                        </Statistic>
                        <Statistic>
                            <Statistic.Value>4704</Statistic.Value>
                            <Statistic.Label>
                                <Icon name="book" />
                                Traductions
                            </Statistic.Label>
                        </Statistic>
                    </Statistic.Group>
                </Segment>

                <div className="home-admin_container">
                    <Segment
                        className="home-admin_container stats-left"
                    ></Segment>

                    <Segment
                        className="home-admin_container stats-right"
                    ></Segment>
                </div>
            </div>
        </HeaderAdmin>
    );
};

export default HomeAdmin;
