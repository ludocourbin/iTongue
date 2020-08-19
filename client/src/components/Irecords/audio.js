import React, { useRef, useState, useEffect } from "react";
import { Progress, Icon } from "semantic-ui-react";

const Audio = ({ url }) => {
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrenTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [percent, setPercent] = useState(0);

    // const togglePlaying = () => {
    //     setPlaying(!playing);
    //     if (!playing) {
    //         audioRef.current.play();
    //         setIrecordSelectedId(id);
    //     } else {
    //         audioRef.current.pause();
    //     }
    // };
    // useEffect(() => {
    //     if (irecordSelectedId !== id) {
    //         setPlaying(false);
    //         audioRef.current.pause();
    //     }
    // }, [irecordSelectedId, id]);

    // useEffect(() => {
    //     const percentAudio = (currentTime / duration) * 100;
    //     setPercent(percentAudio);
    // }, [currentTime, percent, duration]);

    // const setTotal = (number) => {
    //     return (number / 60).toFixed(2);
    // };

    // const padZero = (v) => {
    //     return v < 10 ? "0" + v : v;
    // };

    // const sToTime = (t) => {
    //     return (
    //         padZero(parseInt((t / 60) % 60)) + ":" + padZero(parseInt(t % 60))
    //     );
    // };

    const togglePlaying = () => {
        setPlaying(!playing);
        if (!playing) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };
    useEffect(() => {
        if (irecordSelectedId !== id) {
            setPlaying(false);
            audioRef.current.pause();
        }
    }, [irecordSelectedId, id]);

    useEffect(() => {
        // console.log(currentTime);
        const percentAudio = (currentTime / duration) * 100;
        setPercent(percentAudio);
    }, [currentTime, percent, duration]);

    return (
        <div className="audio">
            <audio
                id={id}
                onLoadedData={() => {
                    setDuration(audioRef.current.duration);
                }}
                onTimeUpdate={() => {
                    setCurrenTime(audioRef.current.currentTime);
                }}
                type="audio/mpeg"
                src={audioUrl}
            />
            <Icon onClick={toggle} name={playing ? "pause" : "play"} />
            <Progress percent={20} />
        </div>
    );
};

export default Audio;
