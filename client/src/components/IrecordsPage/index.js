import React, { useEffect } from "react";

/* Components */
import Layout from "../../containers/Layout";
import Irecords from "../../containers/Irecords";

import data from "../Search/data";
import "./irecordsPage.scss";

const IrecordsPage = (props) => {
    const {
        isLoadingAllRecords,
        allRecordsList,
        recordsListError,
        fetchAllRecords,
        user,
    } = props;

    useEffect(() => {
        fetchAllRecords();
    }, []);

    const audios = data.items.filter((el) => el.type === "audio");

    return (
        <Layout>
            <div className="irecordsPage">
                <h1 className="title">Tout nos iRecords</h1>
                {allRecordsList &&
                    allRecordsList.map((recordUser) => {
                        return (
                            <div style={{ width: "90%" }} key={recordUser.id}>
                                <Irecords
                                    record={recordUser}
                                    user={recordUser.user}
                                    isUserRecord={user.id}
                                />
                            </div>
                        );
                    })}
            </div>
        </Layout>
    );
};

export default IrecordsPage;
