import React, { useState } from "react";
import { Container, Input, Tab, Button } from "semantic-ui-react";

import "./search.scss";

/* Component */
import Layout from "../../containers/Layout";
import Irecords from "../../containers/Irecords";
import MembersCard from "../MembersCard";

import data from "./data";

const Search = () => {
    const [isFocus, setIsFocus] = useState(false);
    const [keyword, setKeyword] = useState("");

    const filteredData = data.items.filter(
        (el) =>
            (el.type === "member" &&
                el.pseudo.toLowerCase().includes(keyword)) ||
            (el.type === "audio" && el.label.toLowerCase().includes(keyword))
    );

    const members = data.items.filter(
        (el) =>
            el.type === "member" && el.pseudo.toLowerCase().includes(keyword)
    );
    const audios = data.items.filter((el) => el.type === "audio");

    const audiosFiltered = audios.filter(
        (el) =>
            el.label.toLowerCase().includes(keyword) ||
            el.traduction.toLowerCase().includes(keyword) ||
            el.author.toLowerCase().includes(keyword)
    );

    const panes = [
        {
            menuItem: "All",
            render: () => (
                <Tab.Pane>
                    {filteredData.map((element) => (
                        <div key={element.id}>
                            {element.type === "member" ? (
                                <MembersCard user={element} />
                            ) : (
                                <Irecords audio={element} />
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
                    {members.map((element) => (
                        <MembersCard user={element} key={element.id} />
                    ))}
                </Tab.Pane>
            ),
        },
        {
            menuItem: "Audios",
            render: () => (
                <Tab.Pane>
                    {audiosFiltered.map((audio) => (
                        <Irecords key={audio.id} audio={audio} />
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
                            {audiosFiltered.map((audio) => {
                                return (
                                    <div
                                        style={{ width: "100%" }}
                                        key={audio.id}
                                    >
                                        <Irecords audio={audio} />
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
