import React, { useRef, useState, useEffect } from "react";
import { Card, Icon, Progress } from "semantic-ui-react";
import getBlobDuration from "get-blob-duration";
import "./audio.scss";

const Audio = ({ irecordSelectedId, setIrecordSelectedId, audio }) => {
    const { id } = audio;

    if (!audio.url) {
        fetch(audio)
            .then((blobContainer) => blobContainer.blob())
            .then((blob) => {
                console.log(blob);
            });
    }
    // console.log(audio);

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

            setIrecordSelectedId(id);
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

    const handleStop = () => {
        audioRef.current.currentTime = 0.0;
        setPlaying(false);
        audioRef.current.pause();
    };

    useEffect(() => {
        if (irecordSelectedId !== id) {
            setPlaying(false);
            audioRef.current.pause();
        }
    }, [irecordSelectedId, id]);

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

    /* J'ai commenté car non utilisé -> Gautier
    const start = (start) => {
        if (start != null) {
            setDuration(audioRef.current.duration);
        }
    };
    */
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
            {/*
            audioRecorder-player flex
              bouton stop
              bouton play
              jauge flex-grow 1 flex-column
                jauge elle-même w100
                temps 100 flex space between
                  debut
                  fin
          */}
            <div className="audioRecorder-player">
                <Icon
                    circular
                    className="audioRecorder-player_btn stopBtn"
                    onClick={handleStop}
                    name="stop"
                />
                <Icon
                    circular
                    className="audioRecorder-player_btn playBtn"
                    onClick={togglePlaying}
                    name={playing ? "pause" : "play"}
                />

                <div
                    className="audioRecorder-player_progress"
                    style={{ cursor: "ew-resize", width: "75%" }}
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
                    <div className='audioRecorder-player_time'>
                        <p className="played">{sToTime(currentTime)}</p>
                        <p className="total">{sToTime(duration)}</p>
                    </div>
                </div>

                <audio
                    id={id}
                    ref={audioRef}
                    type="audio/mpeg"
                    src={
                        audio.url
                            ? `${process.env.REACT_APP_FILES_URL}/${audio.url}`
                            : audio
                    }
                    onLoadedData={handleDuration}
                    onTimeUpdate={() => {
                        setCurrentTime(audioRef.current.currentTime);
                    }}
                    preload="auto"
                />

            </div>

        </Card.Content>
    );
};

export default Audio;
