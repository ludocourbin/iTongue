import React from "react";
import { Card, Flag, Button, Icon } from "semantic-ui-react";
import AudioPlayer from "../../containers/Audio";

const Recording = ({ audio, toggleRecording }) => {
    const { flagOrigin, flagTarget, label, traduction } = audio;
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
                        <Icon name="microphone" />
                        <AudioPlayer audio={audio} />
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
                            Enregistrer
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        </div>
    );
};

export default Recording;
