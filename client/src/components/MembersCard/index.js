import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const MemberCard = ({ user }) => (
    <Link to={`user/${user.slug}`}>
        <Card fluid>
            <Card.Content>
                <Image
                    floated="left"
                    size="large"
                    avatar
                    src={
                        `${process.env.REACT_APP_API_URL}/${user.avatarUrl}` ||
                        "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg"
                    }
                />
                <Card.Header>
                    {user.firstname} {user.lastname}
                </Card.Header>
                <p>{user.records.length || 0} iRecords</p>
            </Card.Content>
        </Card>
    </Link>
);

export default MemberCard;
