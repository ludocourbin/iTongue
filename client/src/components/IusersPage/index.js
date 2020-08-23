import React, { useEffect } from "react";
import { Header } from "semantic-ui-react";

import MembersCard from "../MembersCard";
import Layout from "../../containers/Layout";
import Placeholder from "../Placeholder";

import "./iusersPage.scss";

const IusersPage = (props) => {
    const {
        allUsersList,
        isLoadingallUsers,
        usersListError,
        fetchAllUsers,
    } = props;

    useEffect(() => {
        fetchAllUsers();
    }, []);
    return (
        <Layout>
            <div className="usersPage">
                <h1>Tout nos utilisateurs</h1>
                {isLoadingallUsers && <Placeholder />}
                {!isLoadingallUsers &&
                    allUsersList.map((element) => (
                        <MembersCard user={element} key={element.id} />
                    ))}
            </div>
        </Layout>
    );
};

export default IusersPage;
