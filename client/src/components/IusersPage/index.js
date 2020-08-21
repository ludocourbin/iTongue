import React, { useEffect } from "react";
import { Header } from "semantic-ui-react";

import MembersCard from "../MembersCard";
import Layout from "../../containers/Layout";
import Placeholder from "../Placeholder";
import data from "../Search/data";

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
            <Header as="h1">Tout nos utilisateurs</Header>
            {isLoadingallUsers && <Placeholder />}
            {!isLoadingallUsers &&
                allUsersList.map((element) => (
                    <MembersCard user={element} key={element.id} />
                ))}
        </Layout>
    );
};

export default IusersPage;
