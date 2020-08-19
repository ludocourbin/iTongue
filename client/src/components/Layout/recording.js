import React from "react";
import { Card, Flag, Button, Icon } from "semantic-ui-react";
import iRecords from "../../containers/Irecords";

const Recording = ({ audio }) => {
    const {
        author,
        avatar,
        audioUrl,
        flagOrigin,
        flagTarget,
        label,
        traduction,
    } = audio;
    return (
        <div className="recording">
            <Card>
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
                        <iRecords audio={audio} />
                    </div>

                    <audio src={audioUrl} controls />
                </Card.Content>
                <Card.Content extra>
                    <div className="ui two buttons">
                        <Button basic color="red">
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
