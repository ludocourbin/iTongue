import React from "react";
import { Header } from "semantic-ui-react";

import MembersCard from "../MembersCard";
import Layout from "../../containers/Layout";
import data from "../Search/data";

const IusersPage = () => {
    const members = data.items.filter((el) => el.type === "member");
    return (
        <Layout>
            <Header as="h1">Tout nos utilisateurs</Header>
            {members.map((element) => (
                <MembersCard user={element} key={element.id} />
            ))}
        </Layout>
    );
};

export default IusersPage;
