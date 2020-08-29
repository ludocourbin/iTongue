import React, { useEffect } from "react";

/* Components */
import { Header } from "semantic-ui-react";

/* Containers */
import Layout from "../../containers/Layout";
import Irecords from "../../containers/Irecords";

/* Style */
import "./feed.scss";

const Feed = ({ fetchFeedUser, feedUser }) => {
    useEffect(() => {
        fetchFeedUser();
    }, [fetchFeedUser]);

    return (
        <Layout>
            <div className="feed">
                <Header size="small" content="Fil d'actualités" className="feed-title" />
                <div className="feed-list">
                    {feedUser &&
                        feedUser.map((record) => (
                            <Irecords
                                key={record.id}
                                record={record}
                                user={record.user}
                                isUserRecord={record.user.id}
                            />
                        ))}
                </div>
            </div>
        </Layout>
    );
};

export default Feed;
