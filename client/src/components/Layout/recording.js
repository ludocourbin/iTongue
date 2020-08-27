import React, { useState, useEffect } from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import { motion } from "framer-motion";

import ReactMicComponent from "./reactMicComponent";
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
}) => {
    const [recordedSound, setRecordedSound] = useState(null);
    const [expressionSelected, setExpressionSelected] = useState(null);
    const [translationsSelected, setTranslationsSelected] = useState(null);
    const [translationSelected, seTranslationSelected] = useState(null);

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
        selectIrecordToRecord(null);
        if (expressionSelected || translationSelected) {
            setExpressionSelected(null);
            seTranslationSelected(null);
        }
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
    }, [expressionSelected, allExpressions]);

    const variants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 100 },
    };

    return (
        <motion.div initial="hidden" animate="visible" variants={variants}>
            <Card className="recording-widget">
                <Card.Meta className="recording-widget__closeIcon">
                    <Icon
                        onClick={handleClose}
                        className="recording-widget__closeIcon_item"
                        name="close"
                        corner="top right"
                    />
                </Card.Meta>
                {audio ? (
                    <div>
                        <TranslationLabel translation={audio.englishTranslation} />
                        <TranslationLabel translation={audio.translation} />
                    </div>
                ) : (
                    <div className="container-dropdown">
                        <TranslationDropdown
                            options={optionsText}
                            value={expressionSelected}
                            onChange={handleChangeExpression}
                        />
                        <TranslationDropdown
                            options={translationsSelected && translationsSelected}
                            value={translationSelected && translationSelected}
                            onChange={handleChangeTranslation}
                        />
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
                        <Button onClick={handleReset} basic color="red">
                            <Icon name="refresh" />
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
        </motion.div>
    );
};

export default Recording;
