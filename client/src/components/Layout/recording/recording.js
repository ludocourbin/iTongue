import React, { useState, useEffect } from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import { motion } from "framer-motion";

import ReactMicComponent from "./reactMicComponent";
import AccordionTranslation from "./accordionTranslation";
import TranslationDropdown from "./translationDropdown";
import TranslationLabel from "./tranlationLabel";
import "./recording.scss";

const Recording = ({
    audio,
    toggleRecording,
    sendIrecordsRecorded,
    loading,
    selectIrecordToRecord,
    setTranslationId,
    fetchAllExpressions,
    allExpressions,
    taughtLanguages,
    learnedLanguages,
}) => {
    const [recordedSound, setRecordedSound] = useState(null);

    useEffect(() => {
        fetchAllExpressions();
    }, [fetchAllExpressions]);

    const onSave = () => {
        if (recordedSound) {
            sendIrecordsRecorded(recordedSound);
        }
        toggleRecording(false);
    };

    const handleClose = () => {
        toggleRecording(false);
        selectIrecordToRecord(null);
    };

    const handleReset = () => {
        setRecordedSound(null);
        // selectIrecordToRecord(null);
        // if (expressionSelected || translationSelected) {
        // setExpressionSelected(null);
        // seTranslationSelected(null);
        // }
    };

    const variants = {
        visible: { opacity: 1, y: 50 },
        hidden: { opacity: 0, y: 100 },
    };

    return (
        <motion.div initial="hidden" animate="visible" variants={variants}>
            <Card
                className={`${
                    audio ? "recording-copy" : "recording-selecting"
                } recording-widget`}
            >
                <Card.Meta className="recording-widget__closeIcon">
                    <Icon
                        onClick={handleClose}
                        className="recording-widget__closeIcon_item"
                        name="close"
                        corner="top right"
                    />
                </Card.Meta>
                {audio && (
                    <div>
                        <TranslationLabel translation={audio.englishTranslation} />
                        <TranslationLabel translation={audio.translation} />
                    </div>
                )}

                {!audio && (
                    <div className="container-dropdown">
                        {allExpressions && (
                            <AccordionTranslation
                                allExpressions={allExpressions}
                                taughtLanguages={taughtLanguages}
                                learnedLanguages={learnedLanguages}
                                setTranslationId={setTranslationId}
                            />
                        )}
                    </div>
                )}
                <Card.Content>
                    <ReactMicComponent
                        recordedSound={recordedSound}
                        setRecordedSound={setRecordedSound}
                    />
                </Card.Content>

                <Card.Content extra>
                    <div className="ui two buttons">
                        {recordedSound && (
                            <Button
                                onClick={handleReset}
                                className="recording-widget__cancel-btn"
                                basic
                            >
                                <Icon name="refresh" />
                            </Button>
                        )}

                        <Button
                            disabled={recordedSound ? false : true}
                            onClick={onSave}
                            basic
                            loading={loading}
                            className="recording-widget__save-btn"
                        >
                            Sauvegarder
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        </motion.div>
    );
};

export default Recording;
