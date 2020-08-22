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
}) => {
    const [selectediRecordId, setSelectediRecordId] = useState(null);

    const handleCopyiRecord = () => {
        setSelectediRecordId(record.id);
        selectIrecordToRecord(record);
        setTranslationId(record.translation.language.id);
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
                <Card.Content className="flex author">
                    <Link to={user.slug} className="flex author">
                        <Image
                            avatar
                            floated="left"
                            size="large"
                            src={`${process.env.REACT_APP_API_URL}/${user.avatarUrl}`}
                        />
                        {`${user.firstname} ${user.lastname}`}
                    </Link>
                    {user && user.id !== isUserRecord && (
                        <Icon
                            onClick={handleCopyiRecord}
                            className="irecords-copy"
                            name="copy"
                        />
                    )}
                </Card.Content>
                <Card.Content className="text">
                    <p>
                        <Flag name={record.englishTranslation.language.code} />{" "}
                        {/* englishTranslation -> en attente du back */}
                        {record.englishTranslation.text}
                    </p>
                </Card.Content>
                <Card.Content className="text">
                    <p>
                        <Flag name={record.translation.language.code} />
                        {record.translation.text}
                    </p>
                </Card.Content>
                <AudioPlayer audio={record} />
            </Card>
        </div>
    );
};

export default Irecords;
