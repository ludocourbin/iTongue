import React, { useState } from "react";
import { Container, Input } from "semantic-ui-react";

import "./search.scss";

/* Component */
import Layout from "../../containers/Layout";
import Irecords from "../Irecords/index";

import data from "./data";

const Search = () => {
    const [isFocus, setIsFocus] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [irecordSelectedId, setIrecordSelectedId] = useState(null);

    // const filteredData = data.items.filter(
    //     (el) =>
    //         (el.type === "member" && el.pseudo.includes(keyword)) ||
    //         (el.type === "audio" && el.label.includes(keyword))
    // );
    // const members = data.items.filter(
    //     (el) => el.type === "member" && el.pseudo.includes(keyword)
    // );
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
                                return (
                                    <div
                                        style={{ width: "100%" }}
                                        key={audio.id}
                                    >
                                        <Irecords
                                            audio={audio}
                                            setIrecordSelectedId={
                                                setIrecordSelectedId
                                            }
                                            irecordSelectedId={
                                                irecordSelectedId
                                            }
                                        />
                                    </div>
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
