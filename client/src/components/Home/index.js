import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { Header, Grid, GridColumn, Image, Container, Flag } from "semantic-ui-react";
import Recording from "../../assets/recording.png";

import Irecords from "../../assets/iRecords.png";
import Profil from "../../assets/profil.png";

import "./home.scss";

/* Components */
import MembersCard from "../MembersCard";
import Layout from "../../containers/Layout";
import Carousel from "./carousel";

/* Containers */
import IrecordsComponent from "../../containers/Irecords";

const Home = ({
    bestUsers,
    bestTranslations,
    bestIrecords,
    fetchBestUsers,
    fetchBestTranslations,
    fetchBestIrecords,
    emptyBestIrecords,
}) => {
    useEffect(() => {
        fetchBestUsers();
        fetchBestTranslations();
        fetchBestIrecords();

        return () => {
            emptyBestIrecords();
        };
    }, [fetchBestUsers, fetchBestTranslations, fetchBestIrecords]);

    return (
        <Layout titlePage="Home">
            <ToastContainer autoClose={2000} />
            <Carousel />
            <Container className="homePage">
                <Header
                    size="large"
                    className="homePage--header"
                    content={
                        <Link className="internal-link" to="/signup">
                            Take your first steps with iTongue
                        </Link>
                    }
                />

                <p>
                    iTongue is a social network for learning the most common expressions
                    in other languages.
                </p>
                <p>
                    You can follow other users, access all the expressions they have
                    recorded, listen to them and compare them with your own, so that you
                    can learn and improve your skills in your favorite language.
                </p>

                <Header
                    className="homePage-header"
                    size="medium"
                    content="Our features"
                />
                <Grid divided="vertically">
                    <Grid.Row columns={2}>
                        <GridColumn className="feature feature--left">
                            <Image src={Irecords} />
                        </GridColumn>
                        <GridColumn className="feature feature--right">
                            <p>
                                Listen to a translation, see how it is written and record
                                yourself using it as inspiration.
                            </p>
                        </GridColumn>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <GridColumn className="feature feature--left">
                            <p>
                                Search in our expressions catalog for a translation you
                                think you can pronounce and record yourself!
                            </p>
                        </GridColumn>
                        <GridColumn className="feature feature--right">
                            <Image src={Recording} />
                        </GridColumn>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <GridColumn className="feature feature--left">
                            <Image src={Profil} />
                        </GridColumn>
                        <GridColumn className="feature feature--right">
                            <p>
                                Follow your favorite people to see their skills in a
                                language and learn from them.
                            </p>
                        </GridColumn>
                    </Grid.Row>
                </Grid>
                <Header
                    size="medium"
                    className="homePage-header"
                    content=" Most active iTeachers by language"
                />
                {bestUsers &&
                    bestUsers.map((user) => <MembersCard user={user} key={user.id} />)}

                <Header
                    size="medium"
                    content="Most popular expressions"
                    className="homePage-header"
                />

                {bestTranslations &&
                    bestTranslations.map(({ iRecords, language, text }, index) => (
                        <div key={index} className="home-translations">
                            <Image
                                src={`https://www.countryflags.io/${language}/flat/32.png`}
                                className="flag_image"
                            />

                            <div className="popular_container">
                                <div className="popular__name">{text}</div>
                                <div className="popular__irecords">
                                    {iRecords} iRecords
                                </div>
                            </div>
                        </div>
                    ))}

                <Header
                    size="medium"
                    content={<Link to="/irecords">Last iRecords</Link>}
                    className="homePage-header"
                />
                {bestIrecords &&
                    bestIrecords.map((record) => (
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
