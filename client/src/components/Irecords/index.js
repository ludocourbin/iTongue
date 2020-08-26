import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Flag, Icon, Image, Confirm } from "semantic-ui-react";
import AudioPlayer from "../../containers/Audio";
import { BrowserView, MobileView, isMobile } from "react-device-detect";
import Swipeout from "rc-swipeout";
import "rc-swipeout/assets/index.css";

import "./irecords.scss";

const Irecords = ({
    toggleRecording,
    selectIrecordToRecord,
    isRecording,
    record,
    isUserRecord,
    user,
    setTranslationId,
    isLogged,
    currentUser,
    deleteIrecord,
}) => {
    const [selectediRecordId, setSelectediRecordId] = useState(null);
    const [open, setOpen] = useState(false);

    const handleCopyiRecord = () => {
        setSelectediRecordId(record.id);
        selectIrecordToRecord(record);
        setTranslationId(record.translation.id);
        toggleRecording(true);

        if (isRecording && selectediRecordId === record.id) {
            toggleRecording(false);
        } else {
            toggleRecording(true);
        }
    };

    const handleCancel = () => {
        setOpen(false);
        console.log("handleCancel");
    };

    const handleConfirm = () => {
        setOpen(false);
        console.log("handleConfirm");
        deleteIrecord(record.id);
    };

    if (isMobile && isLogged && currentUser.id === isUserRecord) {
        return (
            <Swipeout
                // left={[]}
                right={[
                    {
                        text: "Supprimer",
                        onPress: () => deleteIrecord(record.id),
                        style: { backgroundColor: "red", color: "white" },
                        className: "custom-class-2",
                    },
                ]}
                autoClose
                style={{
                    height: "117px",
                    width: '100%',
                    marginBottom: "20px",
                    boxShadow: '0 6px 6px rgba(0,0,0,0.2)',
                    borderRadius: '10px',
                    // borderBottom: "1px solid black",
                }}
            >
                <div className="irecords">
                    <Card className="irecords-container" key={record.id}>
                        <Confirm
                            className="delete-irecords"
                            open={open}
                            onCancel={handleCancel}
                            onConfirm={handleConfirm}
                            cancelButton="Annuler"
                            confirmButton="Supprimer"
                            content="Vous êtes sûr de vouloir supprimer ce iRecord ?"
                        />
                        {isLogged && currentUser.id !== isUserRecord && (
                            <Card.Content className="flex author">
                                <Link
                                    to={`user/${user.slug}`}
                                    className="flex author"
                                >
                                    <Image
                                        avatar
                                        floated="left"
                                        size="large"
                                        src={
                                            `${process.env.REACT_APP_FILES_URL}/${user.avatarUrl}` ||
                                            "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg"
                                        }
                                    />
                                    {`${user.firstname} ${user.lastname}`}
                                </Link>
                                <Icon
                                    onClick={handleCopyiRecord}
                                    className="irecords-copy"
                                    name="copy"
                                />
                            </Card.Content>
                        )}

                        {!isLogged && (
                            <Card.Content className="flex author">
                                <Link
                                    to={`user/${user.slug}`}
                                    className="flex author"
                                >
                                    <Image
                                        avatar
                                        floated="left"
                                        size="large"
                                        src={
                                            "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg" ||
                                            `${process.env.REACT_APP_API_URL}/${user.avatarUrl}`
                                        }
                                    />
                                    {`${user.firstname} ${user.lastname}`}
                                </Link>
                            </Card.Content>
                        )}
                        <Card.Content className="text">
                            <p>
                                <Flag
                                    name={
                                        record.englishTranslation.language.code
                                    }
                                />
                                {record.englishTranslation.text}
                            </p>
                        </Card.Content>
                        {record.englishTranslation.language.code !==
                            record.translation.language.code && (
                            <Card.Content className="text">
                                <p>
                                    <Flag
                                        name={record.translation.language.code}
                                    />
                                    {record.translation.text}
                                </p>
                            </Card.Content>
                        )}

                        <AudioPlayer audio={record} />
                    </Card>
                </div>
            </Swipeout>
        );
    } else {
        return (
            <div className="irecords">
                <Card className="irecords-container" key={record.id}>
                    <Confirm
                        className="delete-irecords"
                        open={open}
                        onCancel={handleCancel}
                        onConfirm={handleConfirm}
                        cancelButton="Annuler"
                        confirmButton="Supprimer"
                        content="Vous êtes sûr de vouloir supprimer ce iRecord ?"
                    />
                    {isLogged && currentUser.id !== isUserRecord && (
                        <Card.Content className="flex author">
                            <Link
                                to={`user/${user.slug}`}
                                className="flex author"
                            >
                                <Image
                                    avatar
                                    floated="left"
                                    size="large"
                                    src={
                                        `${process.env.REACT_APP_FILES_URL}/${user.avatarUrl}` ||
                                        "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg"
                                    }
                                />
                                {`${user.firstname} ${user.lastname}`}
                            </Link>
                            <Icon
                                onClick={handleCopyiRecord}
                                className="irecords-copy"
                                name="copy"
                            />
                        </Card.Content>
                    )}
                    {isLogged && currentUser.id === isUserRecord && (
                        <div className="">
                            <BrowserView>
                                <Card.Content className="flex author">
                                    <Icon
                                        onClick={() => setOpen(true)}
                                        className="irecords-copy"
                                        name="delete"
                                    />
                                </Card.Content>
                            </BrowserView>
                            <MobileView>
                                <h1> This is rendered only on mobile </h1>
                            </MobileView>
                        </div>
                    )}

                    {!isLogged && (
                        <Card.Content className="flex author">
                            <Link
                                to={`user/${user.slug}`}
                                className="flex author"
                            >
                                <Image
                                    avatar
                                    floated="left"
                                    size="large"
                                    src={
                                        "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg" ||
                                        `${process.env.REACT_APP_API_URL}/${user.avatarUrl}`
                                    }
                                />
                                {`${user.firstname} ${user.lastname}`}
                            </Link>
                        </Card.Content>
                    )}
                    <Card.Content className="text">
                        <p>
                            <Flag
                                name={record.englishTranslation.language.code}
                            />
                            {record.englishTranslation.text}
                        </p>
                    </Card.Content>
                    {record.englishTranslation.language.code !==
                        record.translation.language.code && (
                        <Card.Content className="text">
                            <p>
                                <Flag name={record.translation.language.code} />
                                {record.translation.text}
                            </p>
                        </Card.Content>
                    )}

                    <AudioPlayer audio={record} />
                </Card>
            </div>
        );
    }
};

export default Irecords;
