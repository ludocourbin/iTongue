import React, { useState, useEffect } from "react";
import { Card, Flag, Button, Icon, Dropdown } from "semantic-ui-react";
import { ReactMic } from "react-mic";

import AudioPlayer from "../../containers/Audio";
import data from "./data";

const Recording = ({
    audio,
    toggleRecording,
    sendIrecordsRecorded,
    loading,
    selectIrecordToRecord,
}) => {
    const [recording, setRecording] = useState(false);
    const [recordedSound, setRecordedSound] = useState(null);
    const [expressionSelected, setExpressionSelected] = useState(null);
    const [translationsSelected, setTranslationsSelected] = useState(null);
    const [translationSelected, seTranlationSelected] = useState(null);

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
    const optionsText = data.map((option) => {
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
        seTranlationSelected(data.value);
    };

    useEffect(() => {
        if (expressionSelected) {
            const expression = data.find(
                (option) => option.englishText === expressionSelected
            );

            console.log(expression.translations);

            const options = expression.translations.map((option) => {
                return {
                    key: option.id,
                    value: option.text,
                    text: option.text,
                };
            });

            setTranslationsSelected(options);
        }
    }, [expressionSelected]);

    return (
        <div className="recording">
            <Card style={{ width: "60%" }} className="">
                {audio && (
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
                                {!recordedSound && !recording && (
                                    <p>Aucun audio</p>
                                )}

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
                                <Button
                                    onClick={handleCancel}
                                    basic
                                    color="red"
                                >
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
                    </div>
                )}
                {!audio && (
                    <div>
                        <Card.Content>
                            <Dropdown
                                selection
                                placeholder="expression to record"
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
                                    placeholder="expression to record"
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
                                {!recordedSound && !recording && (
                                    <p>Aucun audio</p>
                                )}

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
                                <Button
                                    onClick={handleCancel}
                                    basic
                                    color="red"
                                >
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
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Recording;
