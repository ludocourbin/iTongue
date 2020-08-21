import React from "react";
import { Card, Image } from "semantic-ui-react";

const MemberCard = ({ user }) => (
    <Card fluid>
        <Card.Content>
            <Image floated="right" size="mini" src={user.avatarUrl} />
            <p>{user.records.length || 0} iRecords</p>
            <Card.Header>{user.firstname} {user.lastname}</Card.Header>
        </Card.Content>
    </Card>
);

export default MemberCard;
