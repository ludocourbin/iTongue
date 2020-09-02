import React, { useState, useEffect } from "react";
import { Menu, Segment, Sidebar } from "semantic-ui-react";
import { NavLink, Link, useLocation } from "react-router-dom";

import Header from "./menu";
import NavigationBottom from "./navigationBottom";
import Recording from "./recording/recording";

import "./header.scss";

const LayoutHeader = ({
    user,
    isRecording,
    recording,
    toggleRecording,
    logout,
    loading,
    sendIrecordsRecorded,
    isLogged,
    selectIrecordToRecord,
    setTranslationId,
    allExpressions,
    fetchAllExpressions,
    learnedLanguages,
    traductionId,
    taughtLanguages,
    titlePage, 
    ...props
}) => {

    useEffect(() => {
        document.title = `iTongue - ${titlePage}`;
    }, []);

    const [visible, setVisible] = useState(false);
    const { pathname } = useLocation();

    const handleLogout = () => {
        setVisible(!visible);
        logout();
    };
    const classMain = "main-content";
    const classUser = isLogged ? " user" : "";
    const classRecording = isRecording ? " modalRecording" : "";

    console.log("visible", visible);

    return (
        <div className="main-header">
            <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation="overlay"
                    icon="labeled"
                    onHide={() => setVisible(false)}
                    vertical
                    direction="right"
                    visible={visible}
                    width="thin"
                >
                    <div className="main-header-links">
                        <div className="container">
                            <NavLink exact className="main-header-links__item" to={"/"}>
                                Accueil
                            </NavLink>
                            <NavLink className="main-header-links__item" to={"/irecords"}>
                                iRecords
                            </NavLink>
                            <NavLink className="main-header-links__item" to={"/users"}>
                                iUsers
                            </NavLink>
                        </div>
                        {isLogged ? (
                            <div onClick={handleLogout} className="container">
                                <Link to="/" className="main-header-links__item">
                                    Se déconnecter
                                </Link>
                            </div>
                        ) : (
                            <div className="container">
                                <NavLink
                                    className="main-header-links__item"
                                    to={"/login"}
                                >
                                    Connexion
                                </NavLink>
                                <NavLink
                                    className="main-header-links__item"
                                    to={"/signup"}
                                >
                                    Inscription
                                </NavLink>
                            </div>
                        )}

                        <div className="container">
                            <NavLink className="main-header-links__item" to={"/team"}>
                                Team
                            </NavLink>
                            <NavLink className="main-header-links__item" to={"/contact"}>
                                Contact/FAQ
                            </NavLink>
                            <NavLink className="main-header-links__item" to={"/terms"}>
                                Mentions Légales
                            </NavLink>
                        </div>
                    </div>
                </Sidebar>
                <Sidebar.Pusher className="main" dimmed={visible}>
                    <Header
                        pathname={pathname}
                        visible={visible}
                        setVisible={setVisible}
                    />
                    <div className={classMain + classRecording + classUser}>
                        {props.children}
                    </div>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
            {isRecording ? (
                        <Recording
                            selectIrecordToRecord={selectIrecordToRecord}
                            toggleRecording={toggleRecording}
                            audio={recording}
                            setTranslationId={setTranslationId}
                            sendIrecordsRecorded={sendIrecordsRecorded}
                            loading={loading}
                            allExpressions={allExpressions}
                            fetchAllExpressions={fetchAllExpressions}
                            learnedLanguages={learnedLanguages}
                            taughtLanguages={taughtLanguages}
                            traductionId={traductionId}
                        />
                    ) : null}
            {isLogged ? (
                <NavigationBottom
                    toggleRecording={toggleRecording}
                    selectIrecordToRecord={selectIrecordToRecord}
                    user={user}
                    isRecording={isRecording}
                />
            ) : null}
        </div>
    );
};

export default LayoutHeader;
