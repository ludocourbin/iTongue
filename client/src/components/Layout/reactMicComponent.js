import React, { useState } from "react";

import { Icon } from "semantic-ui-react";
import AudioPlayer from "../../containers/Audio";
import AudioRecorder from "audio-recorder-polyfill";
import mpegEncoder from "audio-recorder-polyfill/mpeg-encoder";

AudioRecorder.encoder = mpegEncoder;
AudioRecorder.prototype.mimeType = "audio/mpeg";
window.MediaRecorder = AudioRecorder;

const ReactMicComponent = ({ setRecordedSound, recordedSound }) => {
    // const [micLoading, setMicLoading] = useState(true);
    const [recording, setRecording] = useState(false);
    const [recorder, setRecorder] = useState(null);

    const startRecording = async () => {
        console.log("about to record some sound");
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const rcd = new MediaRecorder(stream);
        rcd.addEventListener("dataavailable", (e) => {
            setRecordedSound(URL.createObjectURL(e.data));
        });

        rcd.start();
        setRecording(true);
        setRecorder(rcd);
    };

    const stopRecording = () => {
        if (recorder) {
            // Stop recording
            recorder.stop();
            setRecording(false);

            // Remove “recording” icon from browser tab
            recorder.stream.getTracks().forEach((i) => i.stop());
        }
    };

    return (
        <div className="reactMicComponent">
            {recordedSound && !recording && <AudioPlayer audio={recordedSound} />}
            {recordedSound && recording && <p>réenregistrement en cours</p>}
            {!recordedSound && !recording && <p>Aucun audio</p>}

            <div className="recording-microphone">
                {recording && (
                    <Icon onClick={stopRecording} name={"stop circle"} size="big" />
                )}
                {!recording && (
                    <Icon onClick={startRecording} name="microphone" size="big" />
                )}
            </div>
        </div>
    );
};

export default ReactMicComponent;

// name={micLoading ? "wait" : "stop circle"}
