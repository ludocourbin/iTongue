import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Flag, Icon, Image, Confirm } from "semantic-ui-react";
import AudioPlayer from "../../containers/Audio";

const Irecord = ({
    record,
    selectIrecordToRecord,
    setTranslationId,
    toggleRecording,
    isRecording,
    user,
    isLogged,
    currentUser,
    deleteIrecord,
    isUserRecord,
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
                        <Link to={`user/${user.slug}`} className="flex author">
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

export default Irecord;
