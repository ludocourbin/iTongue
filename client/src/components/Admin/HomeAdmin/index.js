import React, { useEffect } from "react";
import moment from "moment";

/* Components */
import {
  Segment,
  Statistic,
  Icon,
  Header,
  Table,
  Tab,
  Image,
  Button,
} from "semantic-ui-react";
import HeaderAdmin from "../../../containers/Admin/HeaderAdmin";

/* Style */
import "./homeadmin.scss";
import MemberCard from "../../MembersCard";
import { Link } from "react-router-dom";

const HomeAdmin = ({ fetchStats, stats }) => {
  const {
    userCount,
    recordCount,
    languageCount,
    translationCount,
    recentUsers /* recentRecords */,
  } = stats;

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  console.log("recentUsers", recentUsers);

  return (
    <HeaderAdmin>
      <div className="home-admin">
        <Segment>
          <Statistic.Group widths="four">
            <Statistic>
              <Statistic.Value>{userCount}</Statistic.Value>
              <Statistic.Label>
                <Icon name="user" />
                iUsers
              </Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{recordCount}</Statistic.Value>
              <Statistic.Label>
                <Icon name="microphone" />
                iRecords
              </Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{languageCount}</Statistic.Value>
              <Statistic.Label>
                <Icon name="flag" />
                Languages
              </Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{translationCount}</Statistic.Value>
              <Statistic.Label>
                <Icon name="book" />
                Translations
              </Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </Segment>

        <div className="home-admin_container">
          <Segment className="home-admin_container stats-left">
            <Header size="medium" content="Latest registered users" />
            <Table className="home-admin_recentuser__table" selectable>
              <Table.Header>
                <Table.Row textAlign="center">
                  <Table.HeaderCell>Avatar</Table.HeaderCell>
                  <Table.HeaderCell>Id</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Register at</Table.HeaderCell>
                  <Table.HeaderCell>Profil</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {recentUsers &&
                  recentUsers.map((user, index) => (
                    <Table.Row key={index} textAlign="center">
                      <Table.Cell>
                        <Image
                          avatar
                          src={
                            user.avatarUrl &&
                            user.avatarUrl.slice(0, 4) !== "null"
                              ? `${process.env.REACT_APP_FILES_URL}/${user.avatarUrl}`
                              : "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg"
                          }
                        />
                      </Table.Cell>
                      <Table.Cell>{user.id}</Table.Cell>
                      <Table.Cell>
                        {user.firstname} {user.lastname}
                      </Table.Cell>
                      <Table.Cell>
                        {moment(user.createdAt).fromNow()}
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/user/${user.slug}`} target="_blank">
                          <Icon name="eye" />
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Segment>

          <Segment className="home-admin_container stats-right"></Segment>
        </div>
      </div>
    </HeaderAdmin>
  );
};

export default HomeAdmin;