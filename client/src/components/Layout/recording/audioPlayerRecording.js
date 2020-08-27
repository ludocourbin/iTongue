import React, { useRef, useState, useEffect } from "react";
import { Card, Icon, Progress } from "semantic-ui-react";
import getBlobDuration from "get-blob-duration";
import "./audioPlayerRecording.scss";

const Audio = ({
    irecordSelectedId,
    setIrecordSelectedId,
    audio,
    recordedSound,
    recording,
    startRecording,
    stopRecording,
}) => {
    // const { id, url } = audio;

    if (audio) {
        fetch(audio)
            .then((blobContainer) => blobContainer.blob())
            .then((blob) => {
                console.log(blob);
            });
    }

    const audioRef = useRef(null);
    const progress = useRef(null);

    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [percent, setPercent] = useState(0);
    const [mouseDown, setMouseDown] = useState(false);
    const [displayCurrentime, setDisplayCurrentTime] = useState(false);

    const togglePlaying = () => {
        setPlaying(!playing);

        if (!playing) {
            audioRef.current.play();

            // setIrecordSelectedId(id);
        } else {
            audioRef.current.pause();
        }
    };

    const scrub = (e) => {
        const scrubTime =
            (e.nativeEvent.offsetX / progress.current.offsetWidth) *
            audioRef.current.duration;
        if (!audioRef.current.currentTime) {
            return;
        }
        audioRef.current.currentTime = scrubTime;
    };

    useEffect(() => {
        if (displayCurrentime) {
            const percentAudio = (currentTime / duration) * 100;
            setPercent(percentAudio);
        }
    }, [currentTime, percent, duration, displayCurrentime]);

    const padZero = (v) => {
        return v < 10 ? "0" + v : v;
    };

    const sToTime = (t) => {
        return padZero(parseInt((t / 60) % 60)) + ":" + padZero(parseInt(t % 60));
    };

    const handleDuration = async () => {
        if (audio.blob) {
            const duration = await getBlobDuration(audio.blob);
            setDisplayCurrentTime(true);
            setDuration(duration);
        } else {
            while (audioRef.current.duration === Infinity) {
                await new Promise((r) => setTimeout(r, 10));
                audioRef.current.currentTime = 10000000 * Math.random();
            }
            audioRef.current.currentTime = 0.0;
            setDisplayCurrentTime(true);
            let duration = audioRef.current.duration;
            setDuration(duration);
        }
    };

    return (
        <Card.Content className="audioRecorder" /*textAlign="left"*/>
            <div className="audioRecorder-player">
                <div className="audioRecorder-player_container">
                    <audio
                        ref={audioRef}
                        type="audio/mpeg"
                        src={audio}
                        onLoadedData={handleDuration}
                        onTimeUpdate={() => {
                            setCurrentTime(audioRef.current.currentTime);
                        }}
                        preload="auto"
                    />
                    <div className="audioRecorder-player_containerbtn">
                        {/* Don't have any record and is currently playing */
                        /* Don't have
                        any audio and isn't playing CAT to record */}
                        {!recordedSound && !recording && (
                            <Icon
                                circular
                                className="audioRecorder-player_mic"
                                onClick={startRecording}
                                name="microphone"
                            />
                        )}

                        {/* Don't have record and is recording */}
                        {!recordedSound && recording && (
                            <Icon
                                circular
                                className="audioRecorder-player_mic"
                                onClick={stopRecording}
                                name={"stop"}
                            />
                        )}

                        {/* Has record and isn't playing, requesting to play the record */}
                        {recordedSound && (
                            <Icon
                                circular
                                className="audioRecorder-player_btn"
                                onClick={togglePlaying}
                                name={playing ? "pause" : "play"}
                            />
                        )}

                        {/* ici viens code du bas dans le même ordre actuel */}
                        {/* N'a pas d'audio et est en train d'en enregistrer un */}
                        {!recordedSound && recording && (
                            <div className="audioRecorder-player_waves">
                                <div className="loader-container">
                                    <div className="rectangle-1"></div>
                                    <div className="rectangle-2"></div>
                                    <div className="rectangle-3"></div>
                                    <div className="rectangle-4"></div>
                                    <div className="rectangle-5"></div>
                                    <div className="rectangle-6"></div>
                                    <div className="rectangle-5"></div>
                                    <div className="rectangle-4"></div>
                                    <div className="rectangle-3"></div>
                                    <div className="rectangle-2"></div>
                                    <div className="rectangle-1"></div>
                                </div>
                            </div>
                        )}

                        {/* N'a pas d'audio et n'est pas en train d'en enregistrer un */}
                        {!recordedSound && !recording && (
                            <div className="noAudio">Aucun audio</div>
                        )}
                        {/* Has audio and either playing or not */}
                        {recordedSound && (
                            <div
                                className="audioRecorder-player_progress"
                                style={{ cursor: "ew-resize" }}
                                ref={progress}
                                onClick={scrub}
                                onMouseMove={(e) => mouseDown && scrub(e)}
                                onMouseUp={() => setMouseDown(false)}
                                onMouseDown={() => setMouseDown(true)}
                            >
                                <Progress
                                    percent={percent}
                                    className={playing ? "orange" : null}
                                />
                                <p className="recorder-played">{sToTime(currentTime)}</p>
                                <p className="recorder-total">{sToTime(duration)}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card.Content>
    );
};

export default Audio;
