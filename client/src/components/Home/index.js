import React from "react";
import { ToastContainer } from "react-toastify";
import {
    Header,
    Grid,
    GridColumn,
    Image,
    Container,
    Flag,
} from "semantic-ui-react";
import Recording from "../../assets/recording.png";
import Irecords from "../../assets/iRecords.png";
import Profil from "../../assets/profil.png";

import "./home.scss";

/* Components */
import Layout from "../../containers/Layout";
import Carousel from "./carousel";

/* Containers */
import IrecordsComponent from "../../containers/Irecords";

const users = [
    {
        id: 1,
        avatar:
            "https://ca.slack-edge.com/TUZFANP45-U0102DYQRUL-b7d05e08f84a-512",
        name: "Gautier",
        country: "uk",
        iRecord: "247",
    },
    {
        id: 2,
        avatar:
            "https://ca.slack-edge.com/TUZFANP45-U0103ULSJ5V-58c96cc34176-512",
        name: "Sacha",
        country: "fr",
        iRecord: "247",
    },
    {
        id: 3,
        avatar:
            "https://ca.slack-edge.com/TUZFANP45-UV4JZDGBD-af0c598d1e0f-512",
        name: "Quentin",
        country: "es",
        iRecord: "247",
    },
    {
        id: 4,
        avatar:
            "https://ca.slack-edge.com/TUZFANP45-U0104JX8B0W-bd1d06aa845a-512",
        name: "Axel",
        country: "gr",
        iRecord: "247",
    },
    {
        id: 5,
        avatar:
            "https://ca.slack-edge.com/TUZFANP45-U010EV73MG8-fb8c0bdc3d1e-512",
        name: "Ludo",
        country: "br",
        iRecord: "247",
    },
];

const records = [
    {
        id: 43,
        url: "uploads/records/3/2/3/a/f893d2306ee147e3eda2e3e57e78",
        createdAt: "2020-08-25T08:23:57.547Z",
        user: {
            id: 5,
            firstname: "Gautier",
            lastname: "Colasse",
            slug: "gautier-colasse7",
            avatarUrl: "uploads/avatars/9/e/8/3/1f5e7a08b34c5d49a68544a78bcc",
        },
        englishTranslation: {
            id: 16,
            text: "good morning",
            createdAt: "2020-08-22T20:31:47.270122+00:00",
            expression: {
                id: 13,
                label: "good morning",
                createdAt: "2020-08-22T20:30:44.509395+00:00",
            },
            language: {
                id: 2,
                name: "English",
                code: "gb",
            },
        },
        translation: {
            id: 17,
            text: "buenos dias",
            createdAt: "2020-08-22T20:31:54.653627+00:00",
            expression: {
                id: 13,
                label: "good morning",
                createdAt: "2020-08-22T20:30:44.509395+00:00",
            },
            language: {
                id: 3,
                name: "Espagnol",
                code: "es",
            },
        },
    },
    {
        id: 44,
        url: "uploads/records/8/b/7/0/bd58c77b16ef7f0bce01fc1a98c3",
        createdAt: "2020-08-25T08:27:01.643Z",
        user: {
            id: 5,
            firstname: "Gautier",
            lastname: "Colasse",
            slug: "gautier-colasse7",
            avatarUrl: "uploads/avatars/9/e/8/3/1f5e7a08b34c5d49a68544a78bcc",
        },
        englishTranslation: {
            id: 2,
            text: "How are you ?",
            createdAt: "2020-08-20T14:14:36.917028+00:00",
            expression: {
                id: 1,
                label: "s4d8e",
                createdAt: "2020-08-20T07:17:40.810376+00:00",
            },
            language: {
                id: 2,
                name: "English",
                code: "gb",
            },
        },
        translation: {
            id: 4,
            text: "como estàs ? ",
            createdAt: "2020-08-20T15:07:58.426146+00:00",
            expression: {
                id: 1,
                label: "s4d8e",
                createdAt: "2020-08-20T07:17:40.810376+00:00",
            },
            language: {
                id: 3,
                name: "Espagnol",
                code: "es",
            },
        },
    },
];

const Home = () => {
    return (
        <Layout>
            <ToastContainer autoClose={2000} />
            <Container className="homePage">
                <Carousel />
                <Header
                    size="large"
                    content="Faites vos premiers pas avec iTongue"
                />
                <p>
                    iTongue est un réseau social permettant d'apprendre les
                    expressions les plus communes dans d'autres langues . Vous
                    pouvez suivre d'autres utilisateurs, vous aurez accès à
                    toutes les expressions qu’ils auront gravées pour les
                    écouter et les comparer avec les votres pour ainsi apprendre
                    et s'améliorer dans votre langue favorite.
                </p>
                <Header
                    className="homePage-header"
                    size="medium"
                    content="Nos fonctionnalités"
                />
                <Grid divided="vertically">
                    <Grid.Row columns={2}>
                        <GridColumn>
                            <Image src={Irecords} />
                        </GridColumn>
                        <GridColumn>
                            <p>
                                Écoutez une traduction, regardez comment elle
                                s'écrit et enregistrez vous en vous en
                                inspirant.
                            </p>
                        </GridColumn>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <GridColumn>
                            <p>
                                Recherchez dans notre catalogue d'expressions
                                une traductions que vous pensez être capable de
                                prononcer, enregistrez vous !
                            </p>
                        </GridColumn>
                        <GridColumn>
                            <Image src={Recording} />
                        </GridColumn>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <GridColumn>
                            <Image src={Profil} />
                        </GridColumn>
                        <GridColumn>
                            <p>
                                Suivez vos personnes favorites pour voir leur
                                aptitude dans une langue et apprendre à votre
                                tour.
                            </p>
                        </GridColumn>
                    </Grid.Row>
                </Grid>
                <Header
                    size="medium"
                    className="homePage-header"
                    content="Les linguistiques les plus populaires"
                />
                {users.map((user, index) => (
                    <div key={user.id} className="users">
                        <p>{index + 1}</p>

                        <Image
                            className="users-avatar"
                            src={user.avatar}
                            alt="avatar itongue"
                            avatar
                            size="mini"
                        />
                        <p>{user.name}</p>
                        <p className="users-country">
                            <Flag name={user.country} />
                        </p>
                        <p className="users-records">{user.iRecord} iRecords</p>
                    </div>
                ))}
                <Header
                    size="medium"
                    content="Nos traductions les plus populaires"
                    className="homePage-header"
                />
                {records.map((record) => (
                    <IrecordsComponent
                        key={record.id}
                        record={record}
                        user={record.user}
                        isUserRecord={record.user.id}
                    />
                ))}
            </Container>
        </Layout>
    );
};

export default Home;
