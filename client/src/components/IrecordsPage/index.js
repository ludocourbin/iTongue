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
        fetchAllRecords
    } = props;

    useEffect(() => {
        fetchAllRecords();
    }, []);


    const fakeUser = {
        id: '100',
        slug: 'ludo-dodo',
        avatarUrl: 'https://ca.slack-edge.com/TUZFANP45-U010EV73MG8-fb8c0bdc3d1e-512',
        firstname: 'Ludovic',
        lastname: 'Dodo',
    };

    const audios = data.items.filter((el) => el.type === "audio");

    return (
        <Layout>
           <div className="irecordsPage">
                <h1 className="title">Tout nos iRecords</h1>
                {allRecordsList && allRecordsList.map((recordUser) => {

                    return (
                        <div style={{ width: "90%" }} key={recordUser.id}>
                            <Irecords record={recordUser} user={fakeUser} isUserRecord={recordUser.id}  />
                        </div>
                    )
                })}
            </div> 
        </Layout>
    );
};

export default IrecordsPage;