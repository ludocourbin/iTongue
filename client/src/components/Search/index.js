import moment from "moment";
import React, { useState, useEffect } from "react";
import { Container, Input, Tab, Button } from "semantic-ui-react";
import { orderCreateByDateWithMoment } from "../../utils.js";

/* Component */
import Layout from "../../containers/Layout";
import Irecords from "../../containers/Irecords";
import MembersCard from "../MembersCard";
import Placeholder from "../Placeholder";

/* Style */
import "./search.scss";

const Search = (props) => {
    const {
        allRecordsList,
        fetchAllRecords,
        fetchAllUsers,
        allUsersList,
        isLoadingallUsers,
    } = props;

    useEffect(() => {
        fetchAllRecords();
        fetchAllUsers();
    }, []);

    const [isFocus, setIsFocus] = useState(false);
    const [keyword, setKeyword] = useState("");

    const tabRecordsUsers = [...allRecordsList, ...allUsersList];

    const usersAndRecordsOrderedByDate = orderCreateByDateWithMoment(
        tabRecordsUsers
    );

    const usersAndRecords = usersAndRecordsOrderedByDate.filter(
        (el) =>
            (el.type === "member" &&
                el.firstname.toLowerCase().includes(keyword)) ||
            (el.type === "audio" &&
                el.englishTranslation.text.toLowerCase().includes(keyword)) ||
            (el.type === "audio" &&
                el.user.firstname.toLowerCase().includes(keyword))
    );

    const members = allUsersList.filter((el) =>
        el.firstname.toLowerCase().includes(keyword)
    );

    const audiosFiltered = allRecordsList.filter(
        (el) =>
            el.englishTranslation.text.toLowerCase().includes(keyword) ||
            el.translation.text.toLowerCase().includes(keyword)
    );

    const panes = [
        {
            menuItem: "All",
            render: () => (
                <Tab.Pane>
                    {usersAndRecords &&
                        usersAndRecords.map((record, index) => (
                            <div key={index}>
                                {record.type === "member" ? (
                                    <MembersCard user={record} />
                                ) : (
                                    <Irecords
                                        record={record}
                                        key={record.id}
                                        user={record.user}
                                    />
                                )}
                            </div>
                        ))}
                </Tab.Pane>
            ),
        },
        {
            menuItem: "Members",
            render: () => (
                <Tab.Pane>
                    {members &&
                        members.map((member) => (
                            <MembersCard user={member} key={member.id} />
                        ))}
                </Tab.Pane>
            ),
        },
        {
            menuItem: "Audios",
            render: () => (
                <Tab.Pane>
                    {audiosFiltered &&
                        audiosFiltered.map((record) => (
                            <Irecords
                                key={record.id}
                                record={record}
                                user={record.user}
                            />
                        ))}
                </Tab.Pane>
            ),
        },
    ];

    return (
        <Layout>
            <Container fluid>
                <div className="search-input">
                    <Input
                        icon="search"
                        iconPosition="left"
                        onClick={() => setIsFocus(true)}
                        className="search-input-item"
                        placeholder="Rechercher"
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    {isFocus && (
                        <Button
                            className="search-input-button"
                            color="black"
                            onClick={() => setIsFocus(false)}
                        >
                            Annuler
                        </Button>
                    )}
                </div>

                <Container>
                    {!isFocus && isLoadingallUsers && <Placeholder />}
                    {!isFocus && !isLoadingallUsers && (
                        <div className="search-content--items">
                            <h1>Nos derniers iRecords</h1>
                            {allRecordsList.map((record) => {
                                return (
                                    <div
                                        style={{ width: "100%" }}
                                        key={record.id}
                                    >
                                        <Irecords
                                            record={record}
                                            user={record.user}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {isFocus && <Tab panes={panes} />}
                </Container>
            </Container>
        </Layout>
    );
};

export default Search;
