import React, { useState } from "react";
import { ReactMic } from "react-mic";
import { Icon } from "semantic-ui-react";
import AudioPlayer from "../../containers/Audio";
// import './ReactMicComponent.scss';

const ReactMicComponent = ({ setRecordedSound, recordedSound }) => {
    const [micLoading, setMicLoading] = useState(true);
    const [recording, setRecording] = useState(false);

    const onStop = (recordedBlob) => {
        console.log("recordedBlob is: ", recordedBlob);
        setRecordedSound(recordedBlob);
    };

    const startRecording = () => {
        setRecording(true);
        setTimeout(() => {
            setMicLoading(false);
        }, 1000);
    };

    const stopRecording = () => {
        setRecording(false);
    };

    return (
        <div className="reactMicComponent">
            <ReactMic
                record={recording}
                className="sound-wave"
                onStop={onStop}
                // onData={onData}
                strokeColor="#FFFFFF"
                backgroundColor="#fe734c"
                onBlock={startRecording}
                mimeType="audio/mp3" // Change type wanted here
            />
            {recordedSound && !recording && <AudioPlayer audio={recordedSound} />}
            {recordedSound && recording && <p>réenregistrement en cours</p>}
            {!recordedSound && !recording && <p>Aucun audio</p>}

            <div className="recording-microphone">
                {recording && (
                    <Icon
                        onClick={stopRecording}
                        name={micLoading ? "wait" : "stop circle"}
                        size="big"
                    />
                )}
                {!recording && (
                    <Icon onClick={startRecording} name="microphone" size="big" />
                )}
            </div>
        </div>
    );
};

export default ReactMicComponent;
