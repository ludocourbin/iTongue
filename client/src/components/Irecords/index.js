import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Flag, Icon, Image, Progress } from "semantic-ui-react";
// import Audio from "./audio";

import "./irecords.scss";

const Irecords = ({ audio, irecordSelectedId, setIrecordSelectedId }) => {
    const audioRef = useRef(null);

    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrenTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [percent, setPercent] = useState(0);

    const user = { slug: "ludocourbin" };
    const {
        avatar,
        author,
        id,
        flagOrigin,
        flagTarget,
        label,
        traduction,
        audioUrl,
    } = audio;

    const togglePlaying = () => {
        setPlaying(!playing);
        if (!playing) {
            audioRef.current.play();
            setIrecordSelectedId(id);
        } else {
            audioRef.current.pause();
        }
    };
    useEffect(() => {
        if (irecordSelectedId !== id) {
            setPlaying(false);
            audioRef.current.pause();
        }
    }, [irecordSelectedId]);

    useEffect(() => {
        console.log(currentTime);
        const percentAudio = (currentTime / duration) * 100;
        setPercent(percentAudio);
    }, [currentTime, percent]);

    return (
        <div className="irecords">
            <Card key={id}>
                <Card.Content className="flex">
                    <Image avatar floated="left" size="large" src={avatar} />
                    <Link to={user.slug}>{author}</Link>
                </Card.Content>
                <Card.Content>
                    <p>
                        <Flag name={flagOrigin} />
                        {label}
                    </p>
                </Card.Content>
                <Card.Content>
                    <p>
                        <Flag name={flagTarget} />
                        {traduction}
                    </p>
                </Card.Content>
                <Card.Content className="flex" textAlign="left">
                    <audio
                        id={id}
                        onLoadedData={() => {
                            setDuration(audioRef.current.duration);
                        }}
                        onTimeUpdate={() => {
                            setCurrenTime(audioRef.current.currentTime);
                        }}
                        ref={audioRef}
                        type="audio/mpeg"
                        src={audioUrl}
                    />
                    <Icon
                        onClick={togglePlaying}
                        name={playing ? "pause" : "play"}
                    />

                    <Progress percent={percent} />
                </Card.Content>
            </Card>
        </div>
    );
};

export default Irecords;

// <Audio audioUrl={audioUrl} />
