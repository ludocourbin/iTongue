import React, { useState, useEffect } from "react";
import { Card, Flag, Button, Icon, Dropdown } from "semantic-ui-react";
import { ReactMic } from "react-mic";

import AudioPlayer from "../../containers/Audio";

const Recording = ({
    audio,
    toggleRecording,
    sendIrecordsRecorded,
    loading,
    selectIrecordToRecord,
    setTranslationId,
    fetchAllExpressions,
    allExpressions,
}) => {
    const [recording, setRecording] = useState(false);
    const [recordedSound, setRecordedSound] = useState(null);
    const [expressionSelected, setExpressionSelected] = useState(null);
    const [translationsSelected, setTranslationsSelected] = useState(null);
    const [translationSelected, seTranslationSelected] = useState(null);

    useEffect(() => {
        fetchAllExpressions();
    }, []);

    const startRecording = () => {
        setRecording(true);
    };

    const stopRecording = () => {
        setRecording(false);
    };

    const onData = (recordedBlob) => {
        // console.log("chunk of real-time data is: ", recordedBlob);
    };

    const onStop = (recordedBlob) => {
        console.log("recordedBlob is: ", recordedBlob);
        setRecordedSound(recordedBlob);
    };

    const onSave = () => {
        if (recordedSound) {
            sendIrecordsRecorded(recordedSound);
        }
        toggleRecording(false);
    };

    const handleCancel = () => {
        toggleRecording(false);
        selectIrecordToRecord(null);
    };
    const optionsText = allExpressions.map((option) => {
        return {
            key: option.id,
            value: option.englishText,
            text: option.englishText,
        };
    });

    const handleChangeExpression = (e, data) => {
        setExpressionSelected(data.value);
    };

    const handleChangeTranslation = (e, data) => {
        seTranslationSelected(data.value);
        const languageObject = data.options.find(
            (translation) => translation.value === data.value
        );
        setTranslationId(languageObject.key);
    };

    useEffect(() => {
        if (expressionSelected) {
            const expression = allExpressions.find(
                (option) => option.englishText === expressionSelected
            );

            const options = expression.translations.map((option) => {
                return {
                    key: option.id,
                    value: option.text,
                    text: option.text,
                    flag: option.language.code,
                    language: option.language.id,
                };
            });

            setTranslationsSelected(options);
        }
    }, [expressionSelected]);

    return (
        <div className="recording">
            <Card style={{ width: "60%" }} className="">
                {audio ? (
                    <div>
                        <Card.Content>
                            <Flag
                                name={audio.englishTranslation.language.code}
                            />
                            {audio.englishTranslation.text}
                        </Card.Content>
                        <Card.Content>
                            <Flag name={audio.translation.language.code} />
                            {audio.translation.text}
                        </Card.Content>
                    </div>
                ) : (
                    <div>
                        <Card.Content>
                            <Dropdown
                                selection
                                placeholder="Choose an expression"
                                name="expressions"
                                options={optionsText}
                                value={expressionSelected}
                                onChange={handleChangeExpression}
                            />
                        </Card.Content>
                        {expressionSelected && (
                            <Card.Content>
                                <Dropdown
                                    selection
                                    placeholder="Choose a translation"
                                    name="expressions"
                                    options={
                                        translationsSelected &&
                                        translationsSelected
                                    }
                                    value={
                                        translationSelected &&
                                        translationSelected
                                    }
                                    onChange={handleChangeTranslation}
                                />
                            </Card.Content>
                        )}
                    </div>
                )}
                <Card.Content>
                    <div>
                        <ReactMic
                            record={recording}
                            className="sound-wave"
                            onStop={onStop}
                            onData={onData}
                            strokeColor="#FFFFFF"
                            backgroundColor="#fe734c"
                            onBlock={startRecording}
                            mimeType="audio/mp3" // Change type wanted here
                        />
                        {recordedSound && !recording && (
                            <AudioPlayer audio={recordedSound} />
                        )}
                        {recordedSound && recording && (
                            <p>réenregistrement en cours</p>
                        )}
                        {!recordedSound && !recording && <p>Aucun audio</p>}

                        <div className="recording-microphone">
                            {recording ? (
                                <Icon
                                    onClick={stopRecording}
                                    name="stop circle"
                                    size="big"
                                />
                            ) : (
                                <Icon
                                    onClick={startRecording}
                                    name="microphone"
                                    size="big"
                                />
                            )}
                        </div>
                    </div>
                </Card.Content>

                <Card.Content extra>
                    <div className="ui two buttons">
                        <Button onClick={handleCancel} basic color="red">
                            Annuler
                        </Button>
                        <Button
                            disabled={recordedSound ? false : true}
                            onClick={onSave}
                            basic
                            color="green"
                            loading={loading}
                        >
                            Sauvegarder
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        </div>
    );
};

export default Recording;
