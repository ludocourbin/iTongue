import React, { useRef, useState, useEffect } from "react";
import { Card, Icon, Progress } from "semantic-ui-react";

const Audio = ({ irecordSelectedId, setIrecordSelectedId, audio }) => {
    const { id, audioUrl } = audio;
    const audioRef = useRef(null);
    const progress = useRef(null);

    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [percent, setPercent] = useState(0);
    const [mouseDown, setMouseDown] = useState(false);

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
        const percentAudio = (currentTime / duration) * 100;
        setPercent(percentAudio);
    }, [currentTime, percent, duration]);

    const padZero = (v) => {
        return v < 10 ? "0" + v : v;
    };

    const sToTime = (t) => {
        return (
            padZero(parseInt((t / 60) % 60)) + ":" + padZero(parseInt(t % 60))
        );
    };

    return (
        <Card.Content className="flex" textAlign="left">
            <audio
                id={id}
                onLoadedData={() => {
                    setDuration(audioRef.current.duration);
                }}
                onTimeUpdate={() => {
                    setCurrentTime(audioRef.current.currentTime);
                }}
                ref={audioRef}
                type="audio/mpeg"
                src={audioUrl}
            />
            <Icon className="icon" onClick={handleStop} name="stop" />
            <Icon
                className="icon"
                onClick={togglePlaying}
                name={playing ? "pause" : "play"}
            />
            <div
                style={{ cursor: "ew-resize", width: "100%" }}
                ref={progress}
                onClick={scrub}
                onMouseMove={(e) => mouseDown && scrub(e)}
                onMouseUp={() => setMouseDown(false)}
                onMouseDown={() => setMouseDown(true)}
            >
                <Progress
                    percent={percent}
                    className={playing ? "orange" : null}
                    style={{
                        backgroundColor: "#00000",
                    }}
                ></Progress>
            </div>
            <p className="played">{sToTime(currentTime)}</p>
            <p className="total">{sToTime(duration)}</p>
        </Card.Content>
    );
};

export default Audio;
