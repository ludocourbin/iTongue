import React, { useState, useEffect } from "react";
import { Container, Input, Tab, Button } from "semantic-ui-react";

/* Component */
import Layout from "../../containers/Layout";
import Irecords from "../../containers/Irecords";
import MembersCard from "../MembersCard";

/* Style */
import "./search.scss";

const Search = (props) => {

    const { 
        allRecordsList, 
        fetchAllRecords, 
        fetchAllUsers,
        allUsersList, 
        isLoadingallUsers, 
        usersListError 
    } = props;

    useEffect(() => {
        fetchAllRecords();
        fetchAllUsers();
    }, [])
    
    const fakeUser = {
        id: '100',
        slug: 'ludo-dodo',
        avatarUrl: 'https://ca.slack-edge.com/TUZFANP45-U010EV73MG8-fb8c0bdc3d1e-512',
        firstname: 'Ludovic',
        lastname: 'Dodo',
    };

    const [isFocus, setIsFocus] = useState(false);
    const [keyword, setKeyword] = useState("");

    const tabRecordsUsers = [...allRecordsList, ...allUsersList];
    const orderCreateByDate = tabRecordsUsers.sort((a, b) => a.createdAt - b.createdAt);

    const usersAndRecords = orderCreateByDate.filter(
        (el) =>
            (el.type === "member" &&
                el.firstname.toLowerCase().includes(keyword)) ||
            (el.type === "audio" && el.englishTranslation.text.toLowerCase().includes(keyword))
    );

    const members = allUsersList.filter(
        (el) =>
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
                    {usersAndRecords && usersAndRecords.map((element, index) => (
                        <div key={index}>
                            {element.type === "member" ? (
                                <MembersCard user={element} />
                            ) : (
                                <Irecords record={element} key={element.id} user={fakeUser}/>
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
                    {members && members.map((element) => (
                        <MembersCard user={element} key={element.id} />
                    ))}
                </Tab.Pane>
            ),
        },
        {
            menuItem: "Audios",
            render: () => (
                <Tab.Pane>
                    {audiosFiltered && audiosFiltered.map((audio) => (
                        <Irecords key={audio.id} record={audio} user={fakeUser} />
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
                    {!isFocus && (
                        <div className="search-content--items">
                            <h1>Nos derniers iRecords</h1>
                            {allRecordsList.map((audio) => {
                                return (
                                    <div
                                        style={{ width: "100%" }}
                                        key={audio.id}
                                    >
                                        <Irecords record={audio} user={fakeUser} />
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
