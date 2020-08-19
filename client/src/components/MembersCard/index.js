import React from "react";
import { Card, Image } from "semantic-ui-react";

const MemberCard = ({ user }) => (
    <Card fluid>
        <Card.Content>
            <Image floated="right" size="mini" src={user.avatar} />
            <Card.Header>{user.pseudo}</Card.Header>
        </Card.Content>
    </Card>
);

export default MemberCard;
