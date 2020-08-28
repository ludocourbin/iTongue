import React from "react";
import { isMobile } from "react-device-detect";
import Swipeout from "rc-swipeout";
import "rc-swipeout/assets/index.css";

import IrecordsComponent from "./irecordsComponent";
import "./irecords.scss";

const Irecords = ({
    toggleRecording,
    selectIrecordToRecord,
    isRecording,
    record,
    isUserRecord,
    user,
    setTranslationId,
    isLogged,
    currentUser,
    deleteIrecord,
}) => {
    if (isMobile && isLogged && currentUser.id === isUserRecord) {
        return (
            <Swipeout
                right={[
                    {
                        text: "Supprimer",
                        onPress: () => deleteIrecord(record.id),
                        style: { backgroundColor: "red", color: "white" },
                        className: "custom-class-2",
                    },
                ]}
                autoClose
                style={{
                    height:
                        record.englishTranslation.language.code !==
                        record.translation.language.code
                            ? "170px"
                            : "120px",
                    width: "100%",
                    marginBottom: "33px",
                    boxShadow: "0 6px 6px rgba(0,0,0,0.2)",
                    borderRadius: "10px",
                }}
            >
                <IrecordsComponent
                    record={record}
                    selectIrecordToRecord={selectIrecordToRecord}
                    setTranslationId={setTranslationId}
                    toggleRecording={toggleRecording}
                    isRecording={isRecording}
                    user={user}
                    isLogged={isLogged}
                    currentUser={currentUser}
                    deleteIrecord={deleteIrecord}
                    isUserRecord={isUserRecord}
                />
            </Swipeout>
        );
    } else {
        return (
            <IrecordsComponent
                record={record}
                selectIrecordToRecord={selectIrecordToRecord}
                setTranslationId={setTranslationId}
                toggleRecording={toggleRecording}
                isRecording={isRecording}
                user={user}
                isLogged={isLogged}
                currentUser={currentUser}
                deleteIrecord={deleteIrecord}
                isUserRecord={isUserRecord}
            />
        );
    }
};

export default Irecords;
