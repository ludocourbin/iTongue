import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Flag, Icon, Image } from "semantic-ui-react";
import AudioPlayer from "../../containers/Audio";

import "./irecords.scss";

const Irecords = ({
    audio,
    toggleRecording,
    selectIrecordToRecord,
    isRecording,
    user,
    record,
}) => {
    const [selectediRecordId, setSelectediRecordId] = useState(null);

    const {
        avatar,
        author,
        id,
        flagOrigin,
        flagTarget,
        label,
        traduction,
    } = audio;

    const handleCopyiRecord = () => {
        setSelectediRecordId(id);
        selectIrecordToRecord(audio);
        toggleRecording(true);
        if (isRecording && selectediRecordId === id) {
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
                            src={user.avatarUrl}
                        />
                        {`${user.firstname} ${user.lastname}`}
                    </Link>
                    {user && (
                        <Icon
                            onClick={handleCopyiRecord}
                            className="irecords-copy"
                            name="copy"
                        />
                    )}
                </Card.Content>
                <Card.Content className="text">
                    <p>
                        <Flag name={record.translation.language.code} />
                        {record.translation.text}
                    </p>
                </Card.Content>
                <Card.Content className="text">
                    <p>
                        <Flag name={flagTarget} />
                        {traduction}
                    </p>
                </Card.Content>
                <AudioPlayer audio={audio } record={record }/>
            </Card>
        </div>
    );
};
export default Irecords;
