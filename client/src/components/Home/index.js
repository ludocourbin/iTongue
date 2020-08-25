import React from "react";
import { ToastContainer } from "react-toastify";
import { Header, Grid, GridColumn, Image, Container } from "semantic-ui-react";
import Recording from "../../assets/recording.png";
import Irecords from "../../assets/iRecords.png";
import Profil from "../../assets/profil.png";

import "./home.scss";

/* Components */
import Layout from "../../containers/Layout";

const users = [
    {
        id: 1,
        avatar:
            "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg",
        name: "John Doe",
        country: "Flag",
        iRecord: "247",
    },
    {
        id: 2,
        avatar:
            "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg",
        name: "Tony",
        country: "Flag",
        iRecord: "247",
    },
    {
        id: 3,
        avatar:
            "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg",
        name: "John Doe",
        country: "Flag",
        iRecord: "247",
    },
    {
        id: 4,
        avatar:
            "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg",
        name: "Tony",
        country: "Flag",
        iRecord: "247",
    },
];

const Home = () => {
    return (
        <Layout>
            <ToastContainer autoClose={2000} />
            <Container className="homePage">
                <Header
                    size="large"
                    content="Faites vos premiers pas avec iTongue"
                />
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Labore iusto autem nesciunt delectus hic iure eum aliquam
                    voluptas et vero.
                </p>
                <Header size="medium" content="Nos fonctionnalités" />
                <Grid divided="vertically">
                    <Grid.Row columns={2}>
                        <GridColumn>
                            <Image src={Recording} />
                        </GridColumn>
                        <GridColumn>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Ipsum, sit.
                        </GridColumn>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <GridColumn>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Ipsum, sit.
                        </GridColumn>
                        <GridColumn>
                            <Image src={Irecords} />
                        </GridColumn>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <GridColumn>
                            <Image src={Profil} />
                        </GridColumn>
                        <GridColumn>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Ipsum, sit.
                        </GridColumn>
                    </Grid.Row>
                </Grid>
                <Header
                    size="medium"
                    content="Les linguistiques les plus populaires"
                />
                {users.map((user, index) => (
                    <div key={user.id} className="users">
                        <p>{index}</p>
                        <img className="users-avatar" src={user.avatar} alt="avatar itongue"/>
                        <p>{user.name}</p>
                        <p className="users-country">{user.country}</p>
                        <p className="users-records">{user.iRecord} iRecords</p>
                    </div>
                ))}
            </Container>
        </Layout>
    );
};

export default Home;
