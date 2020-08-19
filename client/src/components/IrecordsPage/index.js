import React from "react";

/* Components */
import Layout from "../../containers/Layout";
import Irecords from "../../containers/Irecords";

import data from "../Search/data";
import "./irecordsPage.scss";

const IrecordsPage = () => {
    const audios = data.items.filter((el) => el.type === "audio");
    return (
        <Layout>
            <div className="irecordsPage">
                <h1 className="title">Tout nos iRecords</h1>
                {audios.map((audio) => {
                    return (
                        <div style={{ width: "90%" }} key={audio.id}>
                            <Irecords audio={audio} />
                        </div>
                    );
                })}
            </div>
        </Layout>
    );
};

export default IrecordsPage;
