import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Flag, Icon, Image } from "semantic-ui-react";
import AudioPlayer from "../../containers/Audio";

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

    return (
        <div className="irecords">
            <Card className="irecords-container" key={record.id}>
                {isLogged && currentUser.id !== isUserRecord && (
                    <Card.Content className="flex author">
                        <Link to={`user/${user.slug}`} className="flex author">
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
                        <Icon
                            onClick={handleCopyiRecord}
                            className="irecords-copy"
                            name="copy"
                        />
                    </Card.Content>
                )}
                {isLogged && currentUser.id === isUserRecord && (
                    <Card.Content className="flex author">
                        <Icon
                            onClick={() => deleteIrecord(record.id)}
                            className="irecords-copy"
                            name="delete"
                        />
                    </Card.Content>
                )}

                {!isLogged && (
                    <Card.Content className="flex author">
                        <Link to={`user/${user.slug}`} className="flex author">
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
                        <Flag name={record.englishTranslation.language.code} />
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
};

export default Irecords;
