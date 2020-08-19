import React, { useState } from "react";
import { Card, Flag, Button, Icon } from "semantic-ui-react";

import AudioPlayer from "../../containers/Audio";

const Recording = ({ audio, toggleRecording }) => {
    const [recording, setRecording] = useState(false);

    const { flagOrigin, flagTarget, label, traduction } = audio;
    const handleRecord = async () => {
        console.log("Lets record some tune !");
        setRecording(true);
    };

    const handleStopRecording = async () => {
        setRecording(false);
        console.log("stop recording");
    };

    return (
        <div className="recording">
            <Card style={{ width: "60%" }} className="">
                <Card.Content>
                    <Flag name={flagOrigin} />
                    {label}
                </Card.Content>
                <Card.Content>
                    <Flag name={flagTarget} />
                    {traduction}
                </Card.Content>
                <Card.Content>
                    <div>
                        <AudioPlayer audio={audio} />
                        <div className="recording-microphone">
                            {recording ? (
                                <Icon
                                    onClick={handleStopRecording}
                                    name="stop circle"
                                    size="big"
                                />
                            ) : (
                                <Icon
                                    onClick={handleRecord}
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
                            onClick={() => toggleRecording(false)}
                            basic
                            color="red"
                        >
                            Annuler
                        </Button>
                        <Button basic color="green">
                            Sauvegarder
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        </div>
    );
};

export default Recording;
