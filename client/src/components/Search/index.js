import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Input, Flag, Card, Feed, Image } from "semantic-ui-react";
import "./search.scss";

import Layout from "../../containers/Layout";

import data from "./data";

const Search = () => {
    const [isFocus, setIsFocus] = useState(false);
    const [keyword, setKeyword] = useState("");

    const filteredData = data.items.filter(
        (el) =>
            (el.type === "member" && el.pseudo.includes(keyword)) ||
            (el.type === "audio" && el.label.includes(keyword))
    );
    const members = data.items.filter(
        (el) => el.type === "member" && el.pseudo.includes(keyword)
    );
    const audios = data.items.filter((el) => el.type === "audio");

    const audiosFiltered = audios.filter(
        (el) =>
            el.label.toLowerCase().includes(keyword) ||
            el.traduction.toLowerCase().includes(keyword) ||
            el.author.toLowerCase().includes(keyword)
    );

    return (
        <Layout>
            <Container fluid>
                <div onClick={() => setIsFocus(true)} className="search-input">
                    <Input
                        placeholder="Rechercher"
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
                <Container>
                    {!isFocus && (
                        <div className="search-content--items">
                            <h1>Nos derniers iRecords</h1>
                            {audiosFiltered.map((audio) => {
                                const {
                                    author,
                                    avatar,
                                    flagOrigin,
                                    flagTarget,
                                    label,
                                    traduction,
                                } = audio;
                                const user = { slug: "ludocourbin" };
                                return (
                                    <Card>
                                        <Card.Content>
                                            <Image
                                                avatar
                                                floated="left"
                                                size="large"
                                                src={avatar}
                                            />
                                            <Link to={user.slug}>{author}</Link>
                                        </Card.Content>
                                        <Card.Content meta>
                                            <p>
                                                <Flag name={flagOrigin} />
                                                {label}
                                            </p>
                                        </Card.Content>
                                        <Card.Content meta>
                                            <p>
                                                <Flag name={flagTarget} />
                                                {traduction}
                                            </p>
                                        </Card.Content>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                    {isFocus && (
                        <div className="">
                            <h1 className="">is focus</h1>
                        </div>
                    )}
                </Container>
            </Container>
        </Layout>
    );
};

export default Search;
