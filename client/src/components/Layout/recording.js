import React, { useState } from "react";
import { Card, Flag, Button, Icon } from "semantic-ui-react";
import { ReactMic } from "react-mic";

import AudioPlayer from "../../containers/Audio";

const Recording = ({ audio, toggleRecording, sendIrecordsRecorded, loading }) => {
    
    const [recording, setRecording] = useState(false);
    const [recordedSound, setRecordedSound] = useState(null);

    const startRecording = () => {
        setRecording(true);
    };

    const stopRecording = () => {
        setRecording(false);
    };

    const onData = recordedBlob => {
        // console.log("chunk of real-time data is: ", recordedBlob);
    };

    const onStop = recordedBlob => {
        console.log("recordedBlob is: ", recordedBlob);
        setRecordedSound(recordedBlob);
    };

    const onSave = () => {
        if (recordedSound) {
            sendIrecordsRecorded(recordedSound);
        }
        toggleRecording(false);
    };

    return (
        <div className="recording">
            <Card style={{ width: "60%" }} className="">
                <Card.Content>
                    <Flag name={audio.englishTranslation.language.code} />
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
                            mimeType="audio/mpeg" // Change type wanted here
                        />
                        {recordedSound && !recording && <AudioPlayer audio={recordedSound} />}
                        {recordedSound && recording && <p>réenregistrement en cours</p>}
                        {!recordedSound && !recording && <p>Aucun audio</p>}

                        <div className="recording-microphone">
                            {recording ? (
                                <Icon onClick={stopRecording} name="stop circle" size="big" />
                            ) : (
                                <Icon onClick={startRecording} name="microphone" size="big" />
                            )}
                        </div>
                    </div>
                </Card.Content>
                <Card.Content extra>
                    <div className="ui two buttons">
                        <Button onClick={() => toggleRecording(false)} basic color="red">
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
