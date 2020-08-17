import React, { useState } from "react";
import { Container, Input, Icon } from "semantic-ui-react";
import "./search.scss";

import Header from "../../containers/Header";

import data from "./data";
import { element } from "prop-types";

const Search = () => {
    const [isFocus, setIsFocus] = useState(false);
    const [keyword, setKeyword] = useState("");

    const filteredData = data.items.filter(
        el =>
            (el.type === "member" && el.pseudo.includes(keyword)) || (el.type === "audio" && el.title.includes(keyword))
    );
    const members = data.items.filter(el => el.type === "member" && el.pseudo.includes(keyword));
    const audios = data.items.filter(el => el.type === "audio");

    const audiosFiltered = audios.filter(
        el =>
            el.title.toLowerCase().includes(keyword) ||
            el.traduction.toLowerCase().includes(keyword) ||
            el.author.toLowerCase().includes(keyword)
    );

    return (
        <Header>
            <Container fluid>
                <div onClick={() => setIsFocus(true)} className="search-input">
                    <Input placeholder="Rechercher" onChange={e => setKeyword(e.target.value)} />
                </div>
                <div className="search-content">
                    <div className="search-content--header"></div>
                    <div className="search-content--items">
                        {audiosFiltered.map(audio => (
                            <div className="">
                                {audio.traduction} {audio.title} {audio.author}
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </Header>
    );
};

export default Search;
